/*News Options Array */
const newsOptions=['all news','national','business','sports','world','politics','technology','startup','entertainment','miscellaneous','hatke','science','automobile'];
 /*Getting news by category*/
async function newsByCategory(category){
    try{
        const response=await fetch(`https://inshortsapi.vercel.app/news?category=${category}`);
        const newsData=await response.json();
        return newsData;
       }catch(error){
           errorHandling(error);
       }
 }
 /*Displaying the news on the DOM */
 async function displayNews(category){
    try{
         const news=category==='all news'?await newsByCategory('all'):await newsByCategory(category);
         document.querySelector('.CategoryName').innerHTML=category;
         const newsItems=news.data.map((element)=>{
                             let item=document.createElement('div');
                             item.className="NewsItem";
                             item.insertAdjacentHTML('beforeend',`<div class="card CardItem">
                                                                 <div class="row">
                                                                  <div class="col-md-8">
                                                                  <div class="card-body">
                                                                  <h4 class="card-title">${element.title}</h4>
                                                                  <p class="card-text"><small>Posted by ${element.author} on ${element.date} at ${element.time}</small></p>
                                                                  <div class="card-text content">${element.content}<br> <a href="${element.readMoreUrl}" target="_blank">Read More</a><br><a href="${element.url}" target="_blank">Link on InShorts</a><br>
                                                                  </div>
                                                                  </div>
                                                                  </div>
                                                                  <div class="col-md-4">
                                                                  <img src="${element.imageUrl}" class="img-fluid rounded-start" alt="Article Image">
                                                                  </div>
                                                                  </div></div><br>`);
                              return item;
                          });
         document.querySelector('.News').replaceChildren(...newsItems);

    }catch(error){
        errorHandling(error);
 
}
 }
/*Displaying the news by category */
function displayByCategory(){
    const categoryValue=document.querySelector('.Category').value.toLowerCase()==='all'? 'all news': document.querySelector('.Category').value.toLowerCase();
    if(newsOptions.findIndex((value)=>value===categoryValue)!==-1){
    displayNews(categoryValue);
    }
    else{
        alert('Please enter a valid option');
    }
    document.querySelector('.newsForm').reset();
}
/*Error Handling */
const errorHandling=(error)=>{
                        document.querySelector('.error-message').innerHTML=error;
                    };
/*Displaying all the news by default*/
displayNews('all news');