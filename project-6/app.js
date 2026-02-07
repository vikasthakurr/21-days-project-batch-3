const schema = [
  {
    id: "identity",
    title: "Identity",
    fields: [
      {
        key: "fullName",
        label: "Full name",
        type: "text",
        placeholder: "Ada Lovelace",
      },
      {
        key: "role",
        label: "Professional title",
        type: "text",
        placeholder: "Computing Pioneer",
      },
      {
        key: "summary",
        label: "Summary",
        type: "textarea",
        placeholder: "2-3 sentence professional snapshot",
        rows: 3,
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    fields: [
      {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "ada@example.com",
      },
      { key: "phone", label: "Phone", type: "tel", placeholder: "+1 555 0100" },
      {
        key: "location",
        label: "Location",
        type: "text",
        placeholder: "London, UK",
      },
      {
        key: "website",
        label: "Portfolio / Website",
        type: "url",
        placeholder: "https://",
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    fields: [
      {
        key: "skills",
        label: "Key skills (comma separated)",
        type: "text",
        placeholder: "Systems design, Data viz, Leadership",
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    repeatable: true,
    fields: [
      { key: "company", label: "Company", type: "text" },
      { key: "title", label: "Role", type: "text" },
      {
        key: "period",
        label: "Period",
        type: "text",
        placeholder: "2022 - Present",
      },
      {
        key: "highlights",
        label: "Highlights (bullet per line)",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    repeatable: true,
    fields: [
      { key: "school", label: "Institution", type: "text" },
      { key: "degree", label: "Degree", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "details", label: "Details", type: "textarea", rows: 2 },
    ],
  },
];

const templates = {
  minimal: {
    label: "Minimal",
    className: "template-minimal",
    render: (data) => `
      <header>
        <h1>${data.fullName || "Your Name"}</h1>
        <p class="text-muted">${data.role || "Title"}</p>
        <p>${joinValues(
          [data.email, data.phone, data.location, data.website],
          " · ",
        )}</p>
      </header>
      <section>
        <h2>Summary</h2>
        <p>${data.summary || defaultSummary()}</p>
      </section>
      ${drawListSection(
        "Experience",
        data.experience,
        (item) => `
          <div class="mb-3">
            <div class="fw-bold">${item.title || "Role"}</div>
            <div>${item.company || "Company"}</div>
            <div class="text-muted small">${item.period || "Timeline"}</div>
            ${drawHighlights(item.highlights)}
          </div>
      `,
      )}
      ${drawListSection(
        "Education",
        data.education,
        (item) => `
          <div class="mb-3">
            <div class="fw-bold">${item.degree || "Degree"}</div>
            <div>${item.school || "School"}</div>
            <div class="text-muted small">${item.period || "Timeline"}</div>
            <p>${item.details || ""}</p>
          </div>
      `,
      )}
      ${drawSkills(data.skillsArray)}
    `,
  },
  card: {
    label: "Card",
    className: "template-card",
    render: (data) => `
      <header>
        <h1>${data.fullName || "Your Name"}</h1>
        <p class="lead mb-2">${data.role || "Title"}</p>
        <div style="margin-top: 1rem;">
          ${drawBadges(
            cleanValues([data.email, data.phone, data.location, data.website]),
          )}
        </div>
      </header>
      <section>
        <h2>About</h2>
        <p>${data.summary || defaultSummary()}</p>
      </section>
      <section>
        <h2>Experience</h2>
        ${drawCardList(
          data.experience,
          (item) => `
            <div>
              <div class="fw-semibold">${item.title || "Role"}</div>
              <div class="text-muted small">${item.company || "Company"} · ${
                item.period || "Timeline"
              }</div>
              ${drawHighlights(item.highlights)}
            </div>
        `,
        )}
      </section>
      <section>
        <h2>Education</h2>
        ${drawCardList(
          data.education,
          (item) => `
            <div>
              <div class="fw-semibold">${item.degree || "Degree"}</div>
              <div class="text-muted small">${item.school || "School"} · ${
                item.period || "Timeline"
              }</div>
              <p class="mb-0">${item.details || ""}</p>
            </div>
        `,
        )}
      </section>
      ${drawSkills(data.skillsArray)}
    `,
  },
};

const state = {
  data: {},
  templateKey: "minimal",
};

// Styles injected into the PDF export
const EXPORT_STYLES = `
  body { font-family: "Inter", sans-serif; margin: 0; padding: 40px; color: #1e293b; background: white; }
  h1 { font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 800; color: #0f172a; }
  h2 { font-size: 1.1rem; letter-spacing: 0.05em; text-transform: uppercase; color: #047857; margin-top: 2rem; border-bottom: 2px solid #ecfdf5; padding-bottom: 0.5rem; font-weight: 700; }
  p { line-height: 1.6; color: #334155; margin-bottom: 1rem; }
  ul { padding-left: 1.25rem; }
  .text-muted { color: #64748b; }
  .badge { background: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 99px; display: inline-block; font-size: 0.8em; margin-right: 4px; }
  .badge-skill { background: #ecfdf5; color: #047857; }
  .template-card .card-item { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
`;

const form = document.getElementById("resumeForm");
const preview = document.getElementById("resumePreview");
const templateSelect = document.getElementById("templateSelect");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");
const atsBtn = document.getElementById("atsBtn");
const atsScoreDisplay = document.getElementById("atsScore");
const atsModal = document.getElementById("atsModal");
const closeModal = document.getElementById("closeModal");
const modalScoreDisplay = document.getElementById("modalScoreDisplay");
const circleProgress = document.querySelector(".circle-progress");
const atsFeedback = document.getElementById("atsFeedback");
const templateCount = document.getElementById("templateCount");
const sectionCount = document.getElementById("sectionCount");
const fieldProgress = document.getElementById("fieldProgress");
const sectionNav = document.getElementById("sectionNav");
const liveMeta = document.getElementById("liveMeta");
const previewStage = document.querySelector(".preview-stage");
const previewBgButtons = document.querySelectorAll("[data-preview-bg]");

const collections = {};
const navButtons = new Map();
// this is a section observor class which is defined below
let sectionObserver;

startApp();

function startApp() {
  setupTemplates();
  buildForm();
  bindUI();

  // Set default preview background
  setPreviewBg("plain");

  drawPreview();
  refreshStats();
}

function setupTemplates() {
  templateSelect.innerHTML = "";

  Object.entries(templates).forEach(([key, template]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = template.label;
    templateSelect.appendChild(option);
  });

  templateSelect.value = state.templateKey;
  templateSelect.addEventListener("change", (e) => {
    state.templateKey = e.target.value;
    drawPreview();
  });
}

function buildForm() {
  sectionObserver = new IntersectionObserver(watchSections, {
    root: document.querySelector("#editorPanel"),
    threshold: 0.1,
  });

  schema.forEach((section) => {
    const wrapper = document.createElement("section");
    wrapper.className = "form-section";
    wrapper.dataset.section = section.id;
    wrapper.id = section.id;

    const heading = document.createElement("div");
    heading.className = "form-section-title";
    heading.textContent = section.title;
    wrapper.appendChild(heading);

    if (section.repeatable) {
      const collection = document.createElement("div");
      collection.className = "group-collection";
      collection.dataset.collection = section.id;
      collections[section.id] = collection;
      wrapper.appendChild(collection);

      const controls = document.createElement("div");
      controls.className = "repeater-controls";
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn btn-outline";
      addBtn.textContent = `Add ${section.title}`;
      addBtn.addEventListener("click", () => addRepeater(section, collection));
      controls.appendChild(addBtn);
      wrapper.appendChild(controls);

      addRepeater(section, collection);
    } else {
      const sectionBody = document.createElement("div");
      sectionBody.className = "form-body";
      section.fields.forEach((field) => {
        sectionBody.appendChild(buildField(section, field));
      });
      wrapper.appendChild(sectionBody);
    }

    form.appendChild(wrapper);
    addSectionLink(section);
    sectionObserver.observe(wrapper);
  });
}
