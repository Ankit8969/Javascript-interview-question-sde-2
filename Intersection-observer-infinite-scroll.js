
function addRows(numRow) {
  const parentBox = document.querySelector('section');
  for (let i=0; i < numRow; i++) {
    const p = document.createElement('p');
    p.innerText = `Hey there how are you ${i+1}`;
    parentBox.appendChild(p);
  }
}

(function(){
  addRows(10);
})();


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const isIntersection = entry.isIntersecting;
    const element = entry.target;
    element.style.visibility = isIntersection ? 'visible' : 'hidden';
    if (isIntersection) observer.unobserve(element);
  })
}, {
  threshold: 1
})

// when we put rootMargin <0 then it will shrink our view, for >0 it expend.

function addNewRows(numRow) {
  const parentBox = document.querySelector('section');
  for (let i=0; i < numRow; i++) {
    const p = document.createElement('p');
    p.innerText = `Hey there how are you ${i+1}`;
    observer.observe(p);
    parentBox.appendChild(p);
  }
}


const infiniteScrollingObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  const isIntersection = lastCard.isIntersecting;
  if (isIntersection) {
    infiniteScrollingObserver.unobserve(lastCard.target);
    addNewRows(5)
    infiniteScrollingObserver.observe(document.querySelector('p:last-child'))
  }
}, {})

infiniteScrollingObserver.observe(
  document.querySelector('p:last-child')
)


const allP = document.querySelectorAll('p');
allP.forEach(entry => {
  observer.observe(entry);
})

