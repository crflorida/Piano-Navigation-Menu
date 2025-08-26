/*!
 * Close menu after onclick event
 * Author : Christina Grant <code@ctrfl.com> (http://ctrfl.com/)
 */

const sidebar = document.querySelector('.sidebar');
const closebtn = document.querySelector('.closebtn');

closebtn.addEventListener('click', () => {
 sidebar.classList.toggle('show');
});