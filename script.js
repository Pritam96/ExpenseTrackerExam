const BASE_URL = 'https://crudcrud.com/api/d0c82f822cf641d0ae8078e5b34582ae';

const form = document.querySelector('#_form');

let total = 0;

form.addEventListener('submit', addToTheList);

async function addToTheList(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const price = Number(document.querySelector('#price').value);

  const item = { name, price };

  // axios
  //   .post(`${BASE_URL}/stock`, item)
  //   .then((res) => {
  //     console.log(res);
  //     showAll();
  //   })
  //   .catch((err) => console.log(err));

  // form.reset();

  try {
    let response = await axios.post(`${BASE_URL}/stock`, item);
    // console.log(response);
    form.reset();
    showAll();
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

function product(item) {
  let card = document.createElement('div');
  card.className = 'card';

  let card_body = document.createElement('div');
  card_body.className = 'card-body';

  let row = document.createElement('div');
  row.className = 'row';

  let price_col = document.createElement('div');
  price_col.className = 'col';
  price_col.appendChild(document.createTextNode(`${item.price} Rupees`));

  let name_col = document.createElement('div');
  name_col.className = 'col';
  name_col.appendChild(document.createTextNode(`${item.name}`));

  // Delete Button
  let deleteBtn = document.createElement('div');
  deleteBtn.className = 'col';
  let button = document.createElement('button');
  button.className = 'btn btn-outline-secondary';
  button.appendChild(document.createTextNode('Delete Product'));
  deleteBtn.appendChild(button);

  button.onclick = () => {
    // axios
    //   .delete(`${BASE_URL}/stock/${item._id}`)
    //   .then((res) => {
    //     console.log(res);
    //     showAll();
    //   })
    //   .catch((err) => console.log(err));

    deleteItem();

    async function deleteItem() {
      try {
        let response = await axios.delete(`${BASE_URL}/stock/${item._id}`);
        // console.log(response);
        showAll();
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    }
  };

  row.appendChild(price_col);
  row.appendChild(name_col);
  row.appendChild(deleteBtn);

  card_body.appendChild(row);
  card.appendChild(card_body);

  document.querySelector('#response').appendChild(card);
  document.querySelector(
    '#total'
  ).innerHTML = `<h5>Total value worth of products: Rs ${total}</h5>`;
}

async function showAll() {
  // document.querySelector('#response').innerHTML = '';
  // total = 0;
  // axios
  //   .get(`${BASE_URL}/stock`)
  //   .then((res) => {
  //     if (res.data.length < 1) {
  //       console.log('no data');
  //       total = 0;
  //       document.querySelector(
  //         '#total'
  //       ).innerHTML = `<h5>Total value worth of products: Rs ${total}</h5>`;
  //     } else {
  //       res.data.forEach((item) => {
  //         total += item.price;
  //         product(item);
  //         console.log(item);
  //       });
  //     }
  //   })
  //   .catch((err) => console.log(err));

  total = 0;
  try {
    let response = await axios.get(`${BASE_URL}/stock`);
    if (response.data.length === 0) {
      document.querySelector('#response').innerHTML = '';
      console.log('NO DATA IS AVAILABLE');
      // total = 0;
      document.querySelector(
        '#total'
      ).innerHTML = `<h5>Total value worth of products: Rs 0</h5>`;
    } else {
      document.querySelector('#response').innerHTML = '';
      response.data.forEach((item) => {
        total += item.price;
        product(item);
      });
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

showAll();

// REQUEST INTERCEPTORS
axios.interceptors.request.use(
  async function (config) {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
