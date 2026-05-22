`use strict`;


const commentsContainer = document.querySelector(`.comments-container`);
const addComment = document.querySelector(`.add-comment`);






let currentUser;
let data;
let commentsArray = [];
let replyContainer;



class CurrentUserCl {
    constructor(username, userImg){
        this.username = username;
        this.userImg = userImg;
    }
}   
                                                        // replies
class CommentCl {                                      
    constructor(username, userImg, content, createdAt, score){
        this.username = username;
        this.userImg = userImg;
        this.content = content;
        this.createdAt = createdAt;
        this.score = score;
        this.replies = [];
    }
}
                                                        // replies
class ReplyCl extends CommentCl {
    constructor(username, userImg, content, createdAt, score, replyingTo) {
        super(username, userImg, content, createdAt, score);
        this.replyingTo = replyingTo;
        this.replies = [];
    }
}


const renderComment = function(el) {
    const commentHTML = `
        <div class="comment-container--main">
            <article class="main-comment">

                <div class="xx">
                    <header class="comment-header">

                        <div class="user-container">
                            <img class="user-img avatar-img" src="${el.userImg}" alt="avatar-img">

                            <span class="user-name">
                                ${el.username}
                            </span>

                            <span class="createdAt">
                                ${el.createdAt}
                            </span>
                        </div>
                                
                        <button class="btn--reply-desktop btn btn--reply">

                            <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

                            Reply
                        </button>

                    </header>

                    <textarea class="comment-text comment-text--main users-comment">${el.content}</textarea>
                </div>

                <div class="yy">
                            
                    <div class="score-container">
                        <button class="btn--pluse btn">
                            <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                            </svg>
                        </button>

                        <span class="score-number">
                            ${el.score}
                        </span>

                        <button class="btn--minus btn">
                            <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                            </svg>
                        </button>
                    </div>

                    <button class="btn--reply-mobile btn btn--reply">
                        <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        Reply
                    </button>

                </div>

            </article>

            <div class="comments-container--reply display-none ${el.username}-replies">
            </div>

        </div>
    `
    commentsContainer.insertAdjacentHTML(`beforeend`, commentHTML);
}


const renderReply = function(el) {
    
    const replyHTML = `
         <article class="reply-comment">

             <div class="xx">
                 <header class="comment-header">

                     <div class="user-container">
                         <img class="user-img avatar-img" src="${el.userImg}" alt="avatar-img">

                             <span class="user-name">
                                 ${el.username}
                             </span>

                             <span class="createdAt">
                                 ${el.createdAt}
                             </span>
                     </div>
                                    
                     <button class="btn--reply-desktop btn btn--reply">
                         <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                         Reply
                     </button>

                 </header>

                 <textarea class="comment-text comment-text--main users-comment">@${el.replyingTo} ${el.content}</textarea>
             </div>

             <div class="yy">
                                
                 <div class="score-container">
                     <button class="btn--pluse btn">
                         <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                         </svg>
                     </button>

                     <span class="score-number">
                         ${el.score}
                     </span>

                     <button class="btn--minus btn">
                         <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                         </svg>
                     </button>
                 </div>

                 <button class="btn--reply-mobile btn btn--reply">
                     <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                     Reply
                 </button>

             </div>

         </article>
    `

    replyContainer.insertAdjacentHTML(`beforeend`, replyHTML);
    replyContainer.classList.remove(`display-none`);
}




const getdata = async function() {
    const res = await fetch(`./app/data.json`);
    data = await res.json();


    if(data.currentUser) {
        currentUser = new CurrentUserCl(data.currentUser.username, data.currentUser.image.png);
    }

    if(data.comments) {
        data.comments.forEach(el => {
            const comment = new CommentCl(el.user.username, el.user.image.png, el.content, el.createdAt, el.score);

            if(el.replies && el.replies.length > 0) {
                el.replies.forEach(el => {
                    const reply = new ReplyCl(el.user.username, el.user.image.png, el.content, el.createdAt, el.score, el.replyingTo)
                    comment.replies.push(reply)
                })
            }

            commentsArray.push(comment);
        })
    }

    if(commentsArray) {

        commentsArray.forEach(el => {
            console.log(el.score)
            renderComment(el);

            if(el.replies && el.replies.length > 0) {
                replyContainer = document.querySelector(`.${el.username}-replies`);
                el.replies.forEach(el => {
                    renderReply(el);
                });
            }
        });
        
        
    }



}

getdata();







// class CommentCl {                                      
//     constructor(username, userImg, content, createdAt, score){
//         this.username = username;
//         this.userImg = userImg;
//         this.content = content;
//         this.createdAt = createdAt;
//         this.replies = [];
//         this.score = score;
//     }
// }






// let commentArry;
// let userWithReplies;







// class currentUser {
//     constructor(image, username) {
//         this.image = image;
//         this.username = username;
//     }
// }


// class Comment {
//     constructor(content, createdAt, image, username, replies){
//         this.content = content;
//         this.createdAt = createdAt;
//         this.image = image;
//         this.username = username;
//         this.replies = replies;
//     }
// }


// class Reply {
//     constructor() {};
// }


// const commentsss = [];


// const getData = function() {

//     fetch(`./app/data.json`).then(res => res.json()).then(data => {

//         // data.forEach(el => console.log(el));

//         if(data.currentUser) {
//             const mainUser = new currentUser(data.currentUser.image.png, data.currentUser.username);


//             // console.log(mainUser);
//         }


//         if(data.comments) {

//             data.comments.forEach(el => {
//                 const cc = new Comment(el.content, el.createdAt, el.user.image.png, el.user.username, el.replies);
//                 commentsss.push(cc)
//                 console.log(commentsss);
//             })
//         }

//         // console.log(data)

//         data.comments.forEach((el, i) => {
            
            // const commentHTML = `
            //     <div class="comment-container--main">
            //         <article class="main-comment">

            //             <div class="xx">
            //                 <header class="comment-header">

            //                     <div class="user-container">
            //                         <img class="user-img avatar-img" src="${el.user.image.png}" alt="avatar-img">

            //                         <span class="user-name">
            //                             ${el.user.username}
            //                         </span>

            //                         <span class="createdAt">
            //                             ${el.createdAt}
            //                         </span>
            //                     </div>
                                
            //                     <button class="btn--reply-desktop btn btn--reply">

            //                         <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

            //                         Reply
            //                     </button>

            //                 </header>

            //                 <textarea class="comment-text comment-text--main users-comment">${el.content}</textarea>
            //             </div>

            //             <div class="yy">
                            
            //                 <div class="score-container">
            //                     <button class="btn--pluse btn">
            //                         <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
            //                         </svg>
            //                     </button>

            //                     <span class="score-number">
            //                         ${el.score}
            //                     </span>

            //                     <button class="btn--minus btn">
            //                         <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
            //                         </svg>
            //                     </button>
            //                 </div>

            //                 <button class="btn--reply-mobile btn btn--reply">

            //                     <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

            //                     Reply
            //                 </button>

            //             </div>

            //         </article>

            //         <div class="comments-container--reply display-none ${el.user.username}-replies">
            //         </div>

            //     </div>
            // `


//             commentsContainer.insertAdjacentHTML(`beforeend`, commentHTML);

//             if(el.replies.length > 0 ) userWithReplies = el

//             if(!userWithReplies) return;

//             if(userWithReplies) {
//                 const xx = document.querySelector(`.${el.user.username}-replies`);

//                 el.replies.forEach(el => {
                    // const replyHTML = `
                    //     <article class="reply-comment">

                    //         <div class="xx">
                    //             <header class="comment-header">

                    //                 <div class="user-container">
                    //                     <img class="user-img avatar-img" src="${el.user.image.png}" alt="avatar-img">

                    //                     <span class="user-name">
                    //                         ${el.user.username}
                    //                     </span>

                    //                     <span class="createdAt">
                    //                         ${el.createdAt}
                    //                     </span>
                    //                 </div>
                                    
                    //                 <button class="btn--reply-desktop btn btn--reply">

                    //                     <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

                    //                     Reply
                    //                 </button>

                    //             </header>

                    //             <textarea class="comment-text comment-text--main users-comment">${el.content}</textarea>
                    //         </div>

                    //         <div class="yy">
                                
                    //             <div class="score-container">
                    //                 <button class="btn--pluse btn">
                    //                     <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                    //                     </svg>
                    //                 </button>

                    //                 <span class="score-number">
                    //                     12
                    //                 </span>

                    //                 <button class="btn--minus btn">
                    //                     <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                    //                     </svg>
                    //                 </button>
                    //             </div>

                    //             <button class="btn--reply-mobile btn btn--reply">

                    //                 <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

                    //                 Reply
                    //             </button>

                    //         </div>

                    //     </article>
                    // `

//                     xx.insertAdjacentHTML(`beforeend`, replyHTML);

//                     xx.classList.remove(`display-none`);

//                     // console.log(el)
//                 })
//             }
//             const usersComment = document.querySelectorAll(`.users-comment`);
//             usersComment.forEach(el => el.disabled = true);
//         })

//         document.addEventListener(`click`, (e) => {
//             if(e.target.closest(`.btn--reply`)) {
//                 addComment.classList.remove(`display-none`);
//                 window.scrollTo({
//                 top: document.body.scrollHeight,
//                 behavior: 'smooth'
//                 });
//                 addComment.style.opacity = 1;
//             };
//         })
//     })
// }

// getData();

