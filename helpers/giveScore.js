function giveScore(score) {
  <% if(students.StudentSubject.score) { %>
    <%= students.StudentSubject.score %>
  <% } else { %>
    <a href="/subjects/<%= students.StudentSubject.id %>/give-score" class="btn btn-success">Give Score</a>
  <% } %>
}