`use strict`;


const commentsContainer = document.querySelector(`.comments-container`);
const addComment = document.querySelector(`.add-comment`);
const sendComment = document.querySelector(`.btn--send-comment`);





let currentUser;
let data;
let commentsArray = [];
let replyContainer;
let replyToName;


class CurrentUserCl {
    constructor(username, userImg){
        this.username = username;
        this.userImg = userImg;
    }
}   

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
            <article class="main-comment comm-container">

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
         <article class="reply-comment comm-container">

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

const disableTextarea = function() {
    const textareasAray = document.querySelectorAll(`.comment-text`);
    textareasAray.forEach(el => el.disabled = true);
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
            renderComment(el);

            if(el.replies && el.replies.length > 0) {
                replyContainer = document.querySelector(`.${el.username}-replies`);
                el.replies.forEach(el => {
                    renderReply(el);
                });
            }
        });
        
        
    }

    disableTextarea();



    document.addEventListener(`click`, (e) => {
        if(e.target.closest(`.btn--reply`)) {

            addComment.classList.remove(`display-none`);
            addComment.style.opacity = 1;
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });

            const replyTo = e.target.closest(`.comm-container`);
            const writeComment = document.querySelector(`.textarea--your-comment`);

            replyToName = replyTo.querySelector(`.user-name`).textContent.trim();
            writeComment.value = `@${replyToName}`;

            writeComment.focus({ preventScroll: true });

        }
    })


    sendComment.addEventListener(`click`, (e) => {
        e.preventDefault();

        const yourCommentText = document.querySelector(`.textarea--your-comment`).value;
        let replyToUserObj;

        commentsArray.forEach(el => {

            if(replyToName === el.username) {
                replyToUserObj = el;

                const yourReply = new ReplyCl(currentUser.username, currentUser.userImg, `${yourCommentText}`, createdAt = `5 min ago`, score = 5 ,  replyToName);

                el.replies.push(yourReply);
                replyContainer = document.querySelector(`.${el.username}-replies`);
                renderReply(yourReply);
            }
        })
    })





}

getdata();



