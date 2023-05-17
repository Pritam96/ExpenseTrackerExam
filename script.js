const BASE_URL = 'https://crudcrud.com/api/ab8754e96ebc414880616b900da507c9';

const form = document.querySelector('#_form');

let total = 0;

form.addEventListener('submit', addToTheList);

function addToTheList(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const price = Number(document.querySelector('#price').value);

  const item = { name, price };

  axios
    .post(`${BASE_URL}/stock`, item)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  form.reset();
  show();
}

function products(item) {
  let div_card = document.createElement('div');
  div_card.className = 'card';

  let div_card_body = document.createElement('div');
  div_card_body.className = 'card-body';

  let div_row = document.createElement('div');
  div_row.className = 'row';

  let div_col_price = document.createElement('div');
  div_col_price.className = 'col';
  div_col_price.appendChild(document.createTextNode(`${item.price} Rupees`));

  let div_col_name = document.createElement('div');
  div_col_name.className = 'col';
  div_col_name.appendChild(document.createTextNode(`${item.name}`));

  // Delete Button
  let deleteBtn = document.createElement('div');
  deleteBtn.className = 'col';
  let btn1 = document.createElement('button');
  btn1.id = 'get_one';
  btn1.className = 'btn btn-outline-secondary';
  btn1.appendChild(document.createTextNode('Delete Product'));
  deleteBtn.appendChild(btn1);

  btn1.onclick = () => {
    axios
      .delete(`${BASE_URL}/stock/${item._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    show();
  };

  div_row.appendChild(div_col_price);
  div_row.appendChild(div_col_name);
  div_row.appendChild(deleteBtn);

  div_card_body.appendChild(div_row);
  div_card.appendChild(div_card_body);

  document.querySelector('#response').appendChild(div_card);
  document.querySelector(
    '#total'
  ).innerHTML = `Total value worth of products: Rs ${total}`;
}

function show() {
  total = 0;
  document.querySelector('#response').innerHTML = '';
  axios.get(`${BASE_URL}/stock`).then((res) => {
    res.data.forEach((item) => {
      total += item.price;
      products(item);
      console.log(item);
    });
  });
}

show();
