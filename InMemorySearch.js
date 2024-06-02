/*
can we implement this in JS
ChatGPT
Yes, you can implement an in-memory search engine in JavaScript. While it might not be as sophisticated or efficient as dedicated 
search engines like Elasticsearch or Redis, it can be quite effective for smaller datasets and specific use cases. Here's a simple example 
of how you can create an in-memory search engine using JavaScript:



*/




class InMemorySearchEngine {
  constructor() {
    this.document = [];
  }
  
  addDocument(document) {
    this.document.push(document);
  }
  
  search(query) {
    let regex = new RegExp(query, 'i');
    let arr = [];
    this.document.forEach((item) => {
      let flag = false;
      Object.values(item).forEach((val) => {
        if (regex.test(val))
          flag = true;
      })
      if (flag)
        arr.push(item);
    })
    return arr;
  }
}

const searchEngine = new InMemorySearchEngine();
searchEngine.addDocument({ id: 1, title: "JavaScript for Beginners", content: "This is a beginner's guide to JavaScript." });
searchEngine.addDocument({ id: 2, title: "Advanced JavaScript", content: "This guide covers advanced JavaScript topics." });
searchEngine.addDocument({ id: 3, title: "JavaScript in the Browser", content: "Learn how to use JavaScript in the browser." });


console.log(searchEngine.search('this'))
