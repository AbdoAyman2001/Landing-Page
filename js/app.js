let initialScrollEvent = true;
let drpDwnList;
let navBar = document.querySelector('header');
let headerElement = document.querySelector('#header');
let sectionsContiner = document.querySelector('.content .container');
let numOfSections = 4;
let isProgramaticallyScrolling = false;
let timeout;
let windowWidth = window.innerWidth;
let icon;
let screenSize = windowWidth >= 992 ? 'big' : 'small';


/** @description This function increases the number of sections by one */
function addSection() {
  numOfSections += 1;
  renderContent();
  highlightActiveLink();
}

/**
 * @description This function scroll to specific element
 * @param {number} sectionId - the order of the section to find it
 */
function scrollToSpecificSection(sectionId) {
  let specifiedSection = document.getElementById(`section${sectionId}`);
  specifiedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** 
 * @description This function sets the active state forthe given link index  
 * @param {number} index - order-index- of the link
 */
function activateNavLink(index) {
  let navLinks = document.querySelectorAll('#header a');
  navLinks.forEach((link) => {
    link.classList.remove('active');
  });
  if (navLinks && navLinks[index]) {
    navLinks[index].classList.add('active');
  }else {
    console.log("no links in the header")
  }
}

/**
 * @description This function sets the active state for the given section index and navigates to it
 * @param {number} sectionNum - the order (index) of the needed index
 */
function navigateToSection(sectionNum) {
  isProgramaticallyScrolling = true;
  activateNavLink(sectionNum);
  scrollToSpecificSection(sectionNum + 1);
  setTimeout(function () {
    isProgramaticallyScrolling = false;
  }, 700);
}

/**
 * @description This function is a basic factored function to render
 *  the sections and the navigation links
 * @param {function} contentCallbackFunc - which returns the content as a
 * string to be injected in the dom
 * @param {HTMLElement} contentContainer - the continer which being injected with the content
 */
function renderSectionRelatedContent(contentCallbackFunc, contentContainer) {
  let contentsFragment = document.createDocumentFragment();
  for (let index = 0; index < numOfSections; index++) {
    let content = contentCallbackFunc(index);
    contentsFragment.appendChild(content);
  }
  contentContainer.innerHTML = '';
  contentContainer.appendChild(contentsFragment);
}

/**
 * @description This function is a basic factored function to inject needed buttons in the dom
 * @param {string} className - the class name of the newly created button
 * @param {string} textContent - the text content of the newly created button
 * @param {function} clickFunction - the function which will be executed when the button is clicked
 */
function renderBtn(className, textContent, clickFunction) {
  let Btn = document.createElement('button');
  Btn.className = className;
  Btn.textContent = textContent;
  Btn.addEventListener('click', clickFunction);
  document.body.appendChild(Btn);
}

/**
 * @description this function scrolls to top smoothly
 */
function scrollToTop(smooth = false) {
  window.scroll({ top: 0, left: 0, behavior: smooth?"smooth":"auto" });
}

/**
 * @description this function checks if the given element is in the viewport
 * @param {HTMLElement} element the given element to check if in the viewport
 * @returns {boolean} presence of the element on the screen
 */
function isSectionInView(element) {
  let elementRect = element.getBoundingClientRect();
  return (
    elementRect.y <= elementRect.height * 0.5 &&
    elementRect.y > elementRect.height * -0.5
  );
}

/**
 * @description this function highlights the present section link in the navigation bar
 */
function highlightActiveLink() {
  let sections = document.querySelectorAll('.content section');
  if (!isProgramaticallyScrolling) {
    sections.forEach(function (section, index) {
      console.log(isSectionInView(section));
      if (isSectionInView(section)) {
        activateNavLink(index);
      }
    });
  }
}

/**
 * @description this function highlight the present section on scrolling
 * and hide fixed navbar
 */
function scrollingRelatedFunctionality() {
  window.addEventListener('scroll', () => {
    highlightActiveLink();
    hideFixedNavBar();
    hideScrollToTopButton();
  });
}

/**
 * @description hides the scroll to top button if it is not the first section
 */
function hideScrollToTopButton() {
  let sections = document.querySelectorAll('.content section');
  let scrollToTopBtn = document.querySelector('button.to-top');
  scrollToTopBtn.style.display = 'block';
  if (isSectionInView(sections[0])) {
    scrollToTopBtn.style.display = 'none';
  }
}

/**
 * @description hiding the navigation bar after specific amoount of time
 */
function hideFixedNavBar() {
  navBar.style.display = 'block';
  clearInterval(timeout);
  timeout = setTimeout(() => {
    navBar.style.display = 'none';
  }, 7000);
}

/**
 * @description This function activates the first link initially
 */
function activateFirstNavLinkInitially() {
  let firstNavLink = document.querySelector('#header li a');
  if (firstNavLink) {
    firstNavLink.classList.add('active');
  }
}

/**
 * @description This function navigates to specified section
 */
function linkClicked() {
  let listItems = document.querySelectorAll('#header > li');
  listItems.forEach(function (element, index) {
    element.addEventListener('click',  ()=> {
      if (screenSize =="big") {
        navigateToSection(index);
      }
    });
  });
}


/**
 * @description rendering the links
 */
function renderHeaderLinks() {
  renderSectionRelatedContent(function (navLinkIndex) {
    let navLink = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.textContent = `Section ${navLinkIndex + 1}`;
    navLink.appendChild(anchor);
    return navLink;
  }, headerElement);
}

/**
 * @description this is a group of functions need to render and rerender the content on the page
 */
function renderContent() {
  // rendering links or collapsable menu
  screenSize == 'big' ? renderHeaderLinks() : renderCollapsableSections();

  // rendering sections' content
  renderSectionRelatedContent(function (sectionIndex) {
    let section = document.createElement('section');
    section.id = `section${sectionIndex + 1}`;
    section.innerHTML = `<div class="wrapper" id="">
          <h2>Section ${sectionIndex + 1}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam vero
            aliquid dolores illo laboriosam libero beatae natus quod nostrum
            suscipit eaque mollitia assumenda ratione et, cupiditate aperiam, omnis
            molestias necessitatibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Error quas quae illum! Sint iusto officiis unde harum
            non magnam quasi est nostrum! Inventore, ullam obcaecati. Blanditiis,
            voluptates. Aliquid, similique? Necessitatibus! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Corporis doloribus voluptatum natus
            recusandae officia labore vero aspernathideur enim dolore est neque totam
            laborum voluptate dolorum blanditiis maiores numquam, dolores commodi.
          </p>
          </div>`;
    return section;
  }, sectionsContiner);

  // adding the event listeners for links
  linkClicked();
}


/**
 * @description this function renders the navigation icon 
 */
function renderNavIcon() {
  icon = document.createElement('li');
  icon.classList.add('fa-chevron-circle-down');
  icon.classList.add('fas');
  headerElement.appendChild(icon);
}

/**
 * @description this function is made to toggle the drop down list 
 * @param {HTMLElement} drpDwnList Toggles the display of the 
 */
function toggleDisplayDropDownMenu(drpDwnList) {
  if (!drpDwnList.style.display || drpDwnList.style.display == 'none') {
    icon.classList.add('active');
    drpDwnList.style.display = 'block';
  } else {
    drpDwnList.style.display = 'none';
    icon.classList.remove('active');
  }
}

/**
 * @description This function renders the collapsed list which appears only
 * in small screens smaller than 992px inner width 
 */
function renderCollapsableSections() {
  headerElement.innerHTML = '';
  renderNavIcon();
  let collapsedList = document.createElement('ul');
  collapsedList.classList.add('drp-dwn');
  headerElement.appendChild(collapsedList);
  icon.addEventListener('click', () => {
    drpDwnList = document.querySelector('.drp-dwn');
    toggleDisplayDropDownMenu(drpDwnList);
    renderSectionRelatedContent((index) => {
      const listItem = document.createElement('li');
      const itemLink = document.createElement('a');
      itemLink.textContent = `Section ${index + 1}`;
      listItem.appendChild(itemLink);
      listItem.addEventListener('click', () => {
        navigateToSection(index);
      });
      return listItem;
    }, collapsedList);
    highlightActiveLink()
  });
}

// scrolling to top if the page when refreshing
window.addEventListener('beforeunload', function () {
  scrollToTop();
});

// this addes the funciton of responsiveness
window.addEventListener('resize', (event) => {
  if (window.innerWidth <= 992) {
    screenSize = 'small';
  } else {
    screenSize = 'big';
  }
  screenSize == 'big' ? renderHeaderLinks() : renderCollapsableSections();
  renderContent()
});

/* this function is made for preventing the the scrolling functionality to
 be executed initially prevent hiding the navigation bar after loading the page */
window.addEventListener('scroll', () => {
  if (initialScrollEvent) {
    scrollingRelatedFunctionality();
  }
  initialScrollEvent = false;
});


// this funciton closes the menu if it is opened
window.addEventListener('click', (event) => {
  if (!headerElement.contains(event.target)) {
    if(icon && drpDwnList){
    drpDwnList.style.display = 'none';
      icon.classList.remove('active');
    }
  }
});

// rendering the add section button
renderBtn('add-section', '+', addSection);

// rendering scroll to top button
renderBtn('to-top', 'Scroll To Top', scrollToTop);

// triggering the script
renderContent();
activateFirstNavLinkInitially();
hideScrollToTopButton();
