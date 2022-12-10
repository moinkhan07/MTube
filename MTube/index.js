let menuIcon = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let container2 = document.querySelector(".container");

menuIcon.onclick = function (){
    sidebar.classList.toggle("small-sidebar");
    container2.classList.toggle("large-container");
}


let search = ()=>{
    let query = document.getElementById("query").value;
    getData(query);
}
let query = document.getElementById("query");
query.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  });

let data;
let getData = async (query)=>{
   let url =  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&key=AIzaSyD_BeCvow7IgTkd_DFCZxnOFgWa0hzwqSM`

   let res = await fetch(url);
   data = await res.json()
   console.log(data)
   append(data.items);

}
let datta;
let homePage = async ()=>{
    let urrl = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&regionCode=IN&key=AIzaSyD_BeCvow7IgTkd_DFCZxnOFgWa0hzwqSM";
    let ros = await fetch(urrl);
    datta = await ros.json();
    append(datta.items);
    console.log(datta.items);
}
let container = document.querySelector(".list-container");
let append = (data)=>{

    container.innerHTML = null;
    data.forEach((el)=>{
        let div = document.createElement("div");
        div.setAttribute("class", "vid-list")
        let thumbnail = document.createElement("img");
        thumbnail.setAttribute("class", "thumbnail");
        thumbnail.src = el.snippet.thumbnails.medium.url;
        thumbnail.onclick = function(){
            save_video(el);
        }
        // Thumnails done


        let div1 = document.createElement("div");
        div1.setAttribute("class","flex-div")
        let logo = document.createElement("img");
        // logo.src = el.snippet.thumbnails.medium.url;
        logo.src = "./images/my.jpg";
        // channel logo done
        

        let div2 = document.createElement("div");
        div2.setAttribute("class", "vid-info");
        let title = document.createElement("a");
        title.innerText = el.snippet.title;
        let channelName = document.createElement("p");
        channelName.innerText = el.snippet.channelTitle;
        let view = document.createElement("p");
        view.innerText = "2M Views • 1 Year Ago"
        // video info done

        
       
        div.append(thumbnail , div1, div2);
        div2.append(title, channelName,view);
        div1.append(logo,div2);
        container.append(div);
    })
}

let save_video = (data)=>{
    localStorage.setItem("data",JSON.stringify(data));
    window.location.href = "play_video.html"
}


let filterBySearch = ()=>{
    let query2 = document.getElementById("filter").value;
    
    let dataE = datta.items;
    dataE = dataE.filter((el)=>{
        return el.snippet.channelId == query2;
    })
    append(dataE);

    let dat = data.items;
    dat = dat.filter((el)=>{
        return el.snippet.channelId == query2;
    })
    append(dat);
 }
