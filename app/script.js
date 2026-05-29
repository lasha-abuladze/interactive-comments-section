`use strict`;


const commentsContainer = document.querySelector(`.comments-container`);
const addComment = document.querySelector(`.add-comment`);
const sendCommentBtn = document.querySelector(`.btn--send-comment`);



// let replyToName;
// let n = 0;


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



class App {

    #data;
    #currentUser;
    #commentsArray = [];
    #replyContainer;
    #replyToName;
    #n = 0;
    #yourCommentText

    constructor() {
        this.#getDataAndRender();
        this.#focusOnAddComment();
        this.#addComment();
    }


    async #getDataAndRender() {
        const res = await fetch(`./app/data.json`);
        this.#data = await res.json();

        this.#getCurrentUserData(this.#data);
        this.#getCommentsData(this.#data);
        this.#renderComment(this.#commentsArray);
        addComment.classList.remove(`display-none`);
        this.#disableTextarea();
        
    }

    ///// creates current users object
    #getCurrentUserData(data) {
        if(data.currentUser) this.#currentUser = new CurrentUserCl(data.currentUser.username, data.currentUser.image.png);
    }

    //// creates comment objects and pushes them into an array 
    #getCommentsData(data) {
        if(data.comments) {
            data.comments.forEach(com => {
                const comment = new CommentCl(com.user.username, com.user.image.png, com.content, com.createdAt, com.score);
                
                this.#getRepliesData(com, comment);
                this.#commentsArray.push(comment);
            })
        }
    }

    ////  creates reply objects and pushes them into a comment object
    #getRepliesData(data, comment) {
        if(data.replies && data.replies.length > 0) {
            data.replies.forEach(rep => {
                const reply = new ReplyCl(rep.user.username, rep.user.image.png, rep.content, rep.createdAt, rep.score, rep.replyingTo)
                comment.replies.push(reply)
            })
        }
    }

    /// renders comments
    #renderComment(comAray) {
        if(comAray.length > 0) {
            comAray.forEach(com => {
                this.#createCommentHTML(com)
                this.#renderReply(com);
            })
        }
    }

    //// creates comment's html 
    #createCommentHTML(comment) {
        const commentHTML = `
            <div class="comment-container--main">
                <article class="main-comment comm-container">

                    <div class="xx">
                        <header class="comment-header">

                            <div class="user-container">
                                <img class="user-img avatar-img" src="${comment.userImg}" alt="avatar-img">

                                <span class="user-name">
                                    ${comment.username}
                                </span>

                                <span class="createdAt">
                                    ${comment.createdAt}
                                </span>
                            </div>
                                    
                            <button class="btn--reply-desktop btn btn--reply">

                                <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>

                                Reply
                            </button>

                        </header>

                        <textarea class="comment-text comment-text--main users-comment">${comment.content}</textarea>
                    </div>

                    <div class="yy">
                                
                        <div class="score-container">
                            <button class="btn--pluse btn">
                                <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                                </svg>
                            </button>

                            <span class="score-number">
                                ${comment.score}
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

                <div class="comments-container--reply display-none ${comment.username}-replies">
                </div>

            </div>
        `

        commentsContainer.insertAdjacentHTML(`beforeend`, commentHTML);
    }


    #renderReply(com) {
        if(com.replies && com.replies.length > 0) {
            this.#replyContainer = document.querySelector(`.${com.username}-replies`);
            com.replies.forEach(el => {
                this.#createReplyHTML(el);
            });
        }
    }

    //// creates reply's html 
    #createReplyHTML(rep) {
        const replyHTML = `
            <article class="reply-comment comm-container">

                <div class="xx">
                    <header class="comment-header">

                        <div class="user-container">
                            <img class="user-img avatar-img" src="${rep.userImg}" alt="avatar-img">

                                <span class="user-name">
                                    ${rep.username}
                                </span>

                                <span class="createdAt">
                                    ${rep.createdAt}
                                </span>
                        </div>
                                        
                        <button class="btn--reply-desktop btn btn--reply">
                            <svg class="icon--reply" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                            Reply
                        </button>

                    </header>

                    <textarea class="comment-text comment-text--main users-comment">@${rep.replyingTo} ${rep.content}</textarea>
                </div>

                <div class="yy">
                                    
                    <div class="score-container">
                        <button class="btn--pluse btn">
                            <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                            </svg>
                        </button>

                        <span class="score-number">
                            ${rep.score}
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

        this.#replyContainer.insertAdjacentHTML(`beforeend`, replyHTML);
        this.#replyContainer.classList.remove(`display-none`);
    }


    #addComment() {
        sendCommentBtn.addEventListener(`click`, (e) => {
            e.preventDefault();
            this.#yourCommentText = document.querySelector(`.textarea--your-comment`);

            if(!this.#replyToName) {
                this.#n++;
                this.#renderYourComment();
            }

            this.#addYourReply();
        })
    }

    //// renders current user's main comment
    #renderYourComment() {
        const yourComment = new CommentCl(this.#currentUser.username, this.#currentUser.userImg, `${this.#yourCommentText.value}`, `5 min ago`, 5);
        this.#commentsArray.push(yourComment);
        this.#createYourCommentHTML(yourComment);
        this.#yourCommentText.value = ``;
        this.#disableTextarea();
    }


    /// creates current user's comment html
    #createYourCommentHTML(commentOBJ) {

        const yourCommentHTML = `
            <div class="comment-container--main your-comment--container your-comment" data-id=${this.#n+1}>
                <article class="main-comment">

                    <div class="xx">
                        <header class="comment-header">

                            <div class="user-container">
                                <img class="user-img avatar-img" src="${commentOBJ.userImg}" alt="avatar-img">

                                <span class="user-name">
                                    ${commentOBJ.username}
                                </span>

                                <span class="createdAt">
                                    ${commentOBJ.createdAt}
                                </span>
                            </div>

                        </header>

                        <textarea class="comment-text comment-text--main users-comment">${commentOBJ.content}</textarea>
                    </div>

                    <div class="yy">
                            
                        <div class="score-container">
                            <button class="btn--pluse btn">
                                <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                                </svg>
                            </button>

                            <span class="score-number">
                                ${commentOBJ.score}
                            </span>

                            <button class="btn--minus btn">
                                <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                                </svg>
                            </button>
                        </div>

                        <div class="delete-edit--container">

                            <button class="btn btn--delete btn--delete-edit-update" data-id = ${this.#n+1}>
                                <svg class="icon-delete" width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                                delete
                            </button>
                                

                            <button class="btn btn--edit btn--delete-edit-update edit-update " data-id = ${this.#n+1}>
                                <svg class="icon-edit" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                                edit
                            </button>
                        
                            <button class="btn btn--delete-edit edit-update display-none btn--update" data-id = ${this.#n+1}>
                                update
                            </button>
                        </div>

                    </div>

                </article>

                <div class="comments-container--reply display-none ${commentOBJ.username}-replies">
                </div>
            </div>
        `
        commentsContainer.insertAdjacentHTML(`beforeend`, yourCommentHTML);
    }


    #addYourReply() {
        const yourReply = new ReplyCl(this.#currentUser.username, this.#currentUser.userImg, `${this.#yourCommentText.value}`, `5 min ago`, 5);

        this.#commentsArray.forEach(commentOBJ => {
            if(this.#replyToName === commentOBJ.username) {
                this.#n++;
                this.#renderYourReply(commentOBJ, yourReply);
            } else {
                this.#commentsArray.forEach(commentOBJ => {
                    commentOBJ.replies.forEach(el => {
                        if(el.username === this.#replyToName){
                            this.#n++
                            this.#renderYourReply(commentOBJ, yourReply);
                        }
                    })
                })
            }
        })
    }
    
    #renderYourReply(commentOBJ, yourReply) {
        commentOBJ.replies.push(yourReply);
        this.#replyContainer = document.querySelector(`.${commentOBJ.username}-replies`);
        this.#createYourReplyHTML(yourReply);
        this.#yourCommentText.value = ``;
        this.#replyToName = ``;
        this.#disableTextarea();
    }

    #createYourReplyHTML(commentOBJ) {
        const yourReplyHTML = `
            <article class="main-comment your-reply your-comment" data-id = ${this.#n+1}>

                <div class="xx">
                    <header class="comment-header">

                        <div class="user-container">
                            <img class="user-img avatar-img" src="${commentOBJ.userImg}" alt="avatar-img">

                            <span class="user-name">
                                ${commentOBJ.username}
                            </span>

                            <span class="createdAt">
                                ${commentOBJ.createdAt}
                            </span>
                        </div>

                    </header>

                    <textarea class="comment-text comment-text--main users-comment">${commentOBJ.content}</textarea>
                </div>

                <div class="yy">
                        
                    <div class="score-container">
                        <button class="btn--pluse btn">
                            <svg class="icon-pluse icon--score" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                            </svg>
                        </button>

                        <span class="score-number">
                            ${commentOBJ.score}
                        </span>

                        <button class="btn--minus btn">
                            <svg class="icon-minus icon--score" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                            </svg>
                        </button>
                    </div>

                    <div class="delete-edit--container">

                        <button class="btn btn--delete btn--delete-edit-ipdate" data-id = ${this.#n+1}>
                            <svg class="icon-delete" width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                            delete
                        </button>
                            

                        <button class="btn btn--edit btn--delete-edit-update edit-update" data-id = ${this.#n+1}>
                            <svg class="icon-edit" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                            edit
                        </button>

                        <button class="btn btn--delete-edit-update edit-update display-none btn--update" data-id = ${this.#n+1}>
                            update
                        </button>
                    </div>

                </div>

            </article>
        `

        this.#replyContainer.insertAdjacentHTML(`beforeend`, yourReplyHTML);
        this.#replyContainer.classList.remove(`display-none`);
    }


    #focusOnAddComment() {
        document.addEventListener(`click`, (e) => {
            if(e.target.closest(`.btn--reply`)) {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth"
                });
                const replyTo = e.target.closest(`.comm-container`);
                const writeComment = document.querySelector(`.textarea--your-comment`);

                this.#replyToName = replyTo.querySelector(`.user-name`).textContent.trim();
                writeComment.value = `@${this.#replyToName}`;
                writeComment.focus({ preventScroll: true });
            }
        })
    }

    #disableTextarea() {
        const textareasAray = document.querySelectorAll(`.comment-text`);
        textareasAray.forEach(el => el.disabled = true);
    }
}

const interactiveCommentsApp = new App();




//// dele3te comment
document.addEventListener(`click`, (e) => {
    if(!e.target.closest(`.btn--delete`)) return;

    const all = document.querySelectorAll(`.your-comment`);
    let clickedId = e.target.dataset.id;

    all.forEach(el => {
        if(el.dataset.id === clickedId) el.remove();
    })

})


//// edit comment
document.addEventListener(`click`, (e) => {
    if(!e.target.closest(`.btn--edit`)) return;

    const all = document.querySelectorAll(`.your-comment`);
    let clickedId = e.target.dataset.id;
    
    all.forEach(el => {
        if(el.dataset.id === clickedId && e.target.classList.contains(`btn--edit`)) {
            const editTextarea = el.querySelector(`.users-comment`);
            const eidtUpdate = el.querySelectorAll(`.edit-update`);

            eidtUpdate.forEach(el => el.classList.toggle(`display-none`));

            editTextarea.disabled = false;
            editTextarea.focus();

            console.log(editTextarea.value);
            console.log(e.target)
        }
    })
})


///update commen 
document.addEventListener(`click`, (e) => {
    if(!e.target.closest(`.btn--update`)) return;

    const all = document.querySelectorAll(`.your-comment`);
    let clickedId = e.target.dataset.id;

    all.forEach(el => {

        if(el.dataset.id === clickedId && e.target.classList.contains(`btn--update`)) {
            const editTextarea = el.querySelector(`.users-comment`);
            const eidtUpdate = el.querySelectorAll(`.edit-update`);

            eidtUpdate.forEach(el => el.classList.toggle(`display-none`));

            editTextarea.disabled = true;
        }
    })
    
})

// getdata();



