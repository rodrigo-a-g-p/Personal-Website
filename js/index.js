import allSkills from "./data.js";

const technicalSkillsContainer = document.querySelector(".skills--technical");
const languageSkillsContainer = document.querySelector(".skills--language");

const skillTextBlock = (name, description) => {
  return `<div class="skills--text">
  <p class="skills--text--title">${name}</p>
  <p class="skills--text--description">
  ${description}
  </p>
</div>
`;
};

const skillImageBlock = (name, image) => {
  return `
<img
  class="skills--image"
  src="assets/images/skills/${image}"
  alt="${name} image"
/>`;
};

const textLeftImageRight = (el) => {
  return skillTextBlock(el["name"], el["description"]).concat(
    " ",
    skillImageBlock(el["name"], el["image"])
  );
};

const textRightImageLeft = (el) => {
  return skillImageBlock(el["name"], el["image"]).concat(
    " ",
    skillTextBlock(el["name"], el["description"])
  );
};

const buildSingleSkillElement = () => {
  allSkills.forEach((el, index) => {
    let combinedElement;

    if (index % 2 === 0) {
      combinedElement = textLeftImageRight(el);
    } else {
      combinedElement = textRightImageLeft(el);
    }

    const skillFlexbox = document.createElement("div");
    skillFlexbox.classList.add("skills--grid--item", "hide-element");
    skillFlexbox.insertAdjacentHTML("beforeend", combinedElement);

    if (el["type"] === "technical") {
      technicalSkillsContainer.appendChild(skillFlexbox);
    }
    if (el["type"] === "language") {
      languageSkillsContainer.appendChild(skillFlexbox);
    }
  });
};

buildSingleSkillElement();

document.querySelectorAll(".navbar-button").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(el.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetDirectChildren = target.children;

        target.classList.remove("hide-element");
        targetDirectChildren[0].classList.add("move-in-left");
        targetDirectChildren[targetDirectChildren.length - 1].classList.add(
          "move-in-right"
        );
      }
    });
  },
  {
    root: null, // meaning root is the viewport
    threshold: 0.4, // fire as soon as <value> * 100% of element is intersecting the root
  }
);

document
  .querySelectorAll(".skills--grid--item")
  .forEach((el) => observer.observe(el));
