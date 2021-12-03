window.addEventListener('load', init)

function init() {
  const adjust = window.innerHeight/2;
  const sections = [];
  const navItems = document.querySelectorAll("#navbar a");
  var csIndex = undefined;

  console.log(adjust);

  document.querySelectorAll("section").forEach((section) => {
    let sectionTop = section.offsetTop;
    let sectionBottom = sectionTop + section.clientHeight;
    sections[sections.length] = {top: sectionTop, bottom: sectionBottom, hash: '#'+section.getAttribute("id")}
  });  

  window.addEventListener("scroll", (e) => {

    if(undefined!=csIndex && window.scrollY + adjust> sections[csIndex].top && window.scrollY + adjust < sections[csIndex].bottom )
    {
      return;
    }
      
    sections.forEach((section, index) => {
      if (window.scrollY + adjust > section.top && window.scrollY +adjust < section.bottom)
        csIndex = index;
    });

    if(csIndex == undefined )
      return;
    
    document.querySelector('#navbar a.active')?.classList.remove('active');
    
    navItems.forEach( (nav) => {
      let url = new URL(nav.href);
      if ( url.hash == sections[csIndex].hash )
        nav.classList.add('active');
    });
  });
 
  
  document.querySelectorAll('a').forEach( (node) => {
    node.addEventListener('click', (e) => {
      let url = new URL(e.target.href);
      if (window.location.hostname != url.hostname ||
          window.location.pathname != url.pathname ||
          !url.hash
        ) {
          return;
        }
        e.preventDefault();
        scrollTo(url.hash)
    });
  });

  function scrollTo(elemId)
  {
    let toPos = document.getElementById(elemId.substr(1))?.offsetTop;
    window.scrollTo({
      top: toPos,
      left: 0,
      behavior: 'smooth'
  });
    
  }
}