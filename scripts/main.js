let reviews = [];

$(document).ready(function () {
  fetch('data/movies.json')
    .then(res => res.json())
    .then(data => {
      reviews = data;
      renderTable();
    });

  $('#loginBtn').click(() => $('#loginModal').modal('show'));
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    const name = $('#username').val();
    $('#loginBtn').text(`Logout (${name})`).off().click(() => location.reload());
    $('#loginModal').modal('hide');
  });

  $('#reviewForm').submit(function (e) {
    e.preventDefault();
    const newReview = {
      date: $('#reviewDate').val(),
      title: $('#movieTitle').val(),
      rating: $('#rating').val(),
      description: $('#description').val()
    };
    const editIdx = $('#editIndex').val();
    if (editIdx !== "") {
      reviews[editIdx] = newReview;
    } else {
      reviews.push(newReview);
    }
    $('#reviewForm')[0].reset();
    $('#editIndex').val('');
    renderTable();
  });

  $('#loadSampleBtn').click(() => {
    $('#reviewDate').val('2025-04-28');
    $('#movieTitle').val('Movie');
    $('#rating').val('10');
    $('#description').val('Description.');
  });

  $('#exportBtn').click(() => {
    console.log(JSON.stringify(reviews, null, 2));
  });
});

function renderTable() {
  const tbody = $('#reviewTable tbody');
  tbody.empty();
  reviews.forEach((review, index) => {
    const row = `<tr>
      <td>${review.date}</td>
      <td>${review.title}</td>
      <td>${review.rating}</td>
      <td>${review.description}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editReview(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteReview(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.append(row);
  });
}

function editReview(index) {
  const r = reviews[index];
  $('#reviewDate').val(r.date);
  $('#movieTitle').val(r.title);
  $('#rating').val(r.rating);
  $('#description').val(r.description);
  $('#editIndex').val(index);
}

function deleteReview(index) {
  if (confirm("Are you sure you want to delete this review?")) {
    reviews.splice(index, 1);
    renderTable();
  }
}
