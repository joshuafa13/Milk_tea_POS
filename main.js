function Drink(name, sugar, ice) {
  this.name = name;
  this.sugar = sugar;
  this.ice = ice;
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30;
    case 'Bubble Milk Tea':
    case 'Lemon Green':
      return 50;
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55;
    default:
      alert('No this drink');
  }
};

const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]');
const alphaPos = new AlphaPos();
function AlphaPos() {}

addDrinkButton.addEventListener('click', function () {
  // 1. 取出店員選擇的飲料品項、甜度、冰塊選項內容
  const drinkName = alphaPos.getSelectedOption('drink');
  const ice = alphaPos.getSelectedOption('ice');
  const sugar = alphaPos.getSelectedOption('sugar');
  console.log(`${drinkName} ${ice} ${sugar}`);
  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose atleast one item.');
    return;
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice);
  console.log(drink);
  console.log(drink.price());

  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink);
});

AlphaPos.prototype.getSelectedOption = function (input) {
  let selectedOption = '';
  document.querySelectorAll(`[name="${input}"]`).forEach((item) => {
    if (item.checked) {
      selectedOption = item.value;
    }
  });
  return selectedOption;
};

const orderLists = document.querySelector('[data-order-lists]');

AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
			<div class="card-body pt-3 pr-3">
				<div class="text-right">
					<span data-alpha-pos="delete-drink">×</span>
				</div>
				<h6 class="card-title mb-1">${drink.name}</h6>
				<div class="card-text">${drink.ice}</div>
				<div class="card-text">${drink.sugar}</div>
			</div>
			<div class="card-footer text-right py-2">
				<div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
			</div>
		</div>
  `;
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard);
};

orderLists.addEventListener('click', function (event) {
  console.log(event.target);
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]');
  if (!isDeleteButton) return;
  console.log(event.target.parentElement.parentElement.parentElement);
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement);
});

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove();
};

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0;
  document.querySelectorAll('[data-drink-price]').forEach((drink) => {
    totalAmount += Number(drink.textContent);
  });
  return totalAmount;
};

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]');
checkoutButton.addEventListener('click', function () {
  alert(`The total amount of drinks: $${alphaPos.checkout()}`);
  alphaPos.clearList(orderLists);
});

AlphaPos.prototype.clearList = function (target) {
  target.querySelectorAll('.card').forEach((card) => {
    card.remove();
  });
};
