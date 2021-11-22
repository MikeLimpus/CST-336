/**
 * Mike Limpus
 * CST 336 Midterm
 * 11/20/2021
 */

$(document).ready(() => {
    var price;
    var qty;
    var total;
    var discount = 0;
    var shippingCost;
    var shippingMethods = {};

    getRandomProduct();
    loadShipping();

    /**
     * Get the product information via API and update HTML 
     */
    async function getRandomProduct() {
        let productURL = "https://webspace.csumb.edu/~lara4594/ajax/promo/products.php";
        let response = await fetch(productURL);
        let data = await response.json();
        let i = Math.floor(Math.random() * data.length);
        price = data[i].price;
        qty = data[i].qty;
        total = price * qty;
        console.log(data[i]);
        $("#productName").html(`${data[i].productName}`);
        $("#unitPrice").html(`$${price}`);
        $("#quantity").val(`${qty}`);
        $("#productValue").html(`$${total}`)
    };

    /**
     * Get the discount code from API, update totals and HTML
     */
    async function getDiscountCode() {
        let code = $("#promoCode").val();
        console.log(code);
        let discountURL = `https://webspace.csumb.edu/~lara4594/ajax/promo/promoCode.php?promoCode=${code}`
        let response = await fetch(discountURL);
        let data = await response.json();
        console.log(data);
        if(data != false) {
            $("#promoError").html("");
            $("#discountPercent").html(`-${data.discount}%`);
            discount = (data.discount / 100) * total;
            $("#discountValue").html(`-$${discount}`);
        }
        else {
            $("#promoError").html("Invalid Code");
            $("#discountPercent").html(``);
            discount = 0;
            $("#discountValue").html(``);
        }
        updateTotal();
    };

    /**
     * Initialize the shipping menu via API, create a local copy of information
     * for access from update functions
     */
    async function loadShipping() {
        let shippingURL = "https://webspace.csumb.edu/~lara4594/ajax/promo/shippingMethods.php"
        let response = await fetch(shippingURL);
        let data = await response.json();
        shippingMethods = data;
        console.log(shippingMethods);
        console.log(data);
        for (let i = 0; i < data.length; ++i) {
            $("#shippingOptions").append(`<option id="${i}">${data[i].shippingMethod} (+$${data[i].price})</option>`)
        }
        shippingCost = shippingMethods[$("#shipping option:selected").attr('id')].price;
        $("#shippingValue").html(`$${shippingCost}`);
    }

    /**
     * Calculate total prices including tax using global variables, and update 
     * related HTML elements
     */
    function updateTotal() {
        let subtotal = total - discount + shippingCost;
        $("#subtotalValue").html(`$${subtotal}`);
        let tax = (subtotal / 10)
        $("#taxValue").html(`$${tax}`);
        let finalTotal = subtotal + tax;
        $("#totalValue").html(`$${finalTotal}`);
    };

    /*
     * Event Listeners
     */
    $("#quantity").on("keyup", () => {
        qty = $("#quantity").val();
        total = price * qty;
        $("#productValue").html(`$${total}`);
        // Discount code must be reevaluated after quantities change
        discount = 0;
        $("#discountValue").html("");
        $("#discountPercent").html("");
        updateTotal();
    });

    $("#applyPromo").click(getDiscountCode);

    $("#shipping").on("change", () => {
        shippingCost = shippingMethods[$("#shipping option:selected").attr('id')].price;
        $("#shippingValue").html(`$${shippingCost}`);
        updateTotal();
    });

    // The rubric is much larger than the page itself, I will hide it by default
    // and allow it to be viewed within the page
    var shown = false; 
    $("#rubricButton").on("click", () => {
        if (shown === false) {
            $("#rubricTable").css("display", "table");
            shown = true;
        }
        else {
            $("#rubricTable").css("display", "none");
            shown = false;
        }
    });
});