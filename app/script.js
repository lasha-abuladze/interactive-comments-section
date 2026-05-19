`use strict`;


const usersComment = document.querySelectorAll(`.users-comment`)






usersComment.forEach(el => el.disabled = true);
usersComment[0].value = `Impressive! Though it seems the drag feature could be improved. But overall it looks   . You’ve nailed the design and the responsiveness at various breakpoints works really well.`;


console.log(usersComment[0].value.style)

// console.log())