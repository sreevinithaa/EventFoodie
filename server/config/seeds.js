const db = require("./connection");
const {
  Customer,
  EventProgram,
  Event,
  FoodVendors,
  Menu,
} = require("../models");

db.once("open", async () => {
  await Customer.deleteMany();

  const customer = await Customer.insertMany([
    {
      firstName: "Vinitha",
      lastName: "Gowtheepan",
      email: "vini@gmail.com",
      phone: "0499702703",
      password: "123456",
      userRole: "Public",
    },
    {
      firstName: "Aimee",
      lastName: "Jeson",
      email: "aimee@gmail.com",
      phone: "0299793492",
      password: "123456",
      userRole: "Host",
    },
    {
      firstName: "Kayal",
      lastName: "Gow",
      email: "kayal@gmail.com",
      phone: "0588307495",
      password: "123456",
      userRole: "Public",
    },
  ]);

  console.log("Customer seeded");

  await Event.deleteMany();
  var date = new Date();
  const event = await Event.insertMany([
    {
      eventName: "Spinifex Spree Carnival 2022",
      description: `Spinifex Spree has been running in Port Hedland since 1968, is the premier carnival event on the Hedland calendar and continues to be the Town's largest free community event.This year, we're introducing Truck Alley to the event. This will include an array of vehicles, trucks and machinery such as rubbish trucks, emergency vehicles, earth moving machinery and boats. `,
      imageUrl: "spinifex.png",
      venue: "Town Oval in Port Hedland",
      city: "Port Hedland",
      startDate: date,
      endDate: date.addDays(90),
      user: customer[1]._id,
    },
    {
      eventName: `Sunset Food Markets`,
      description: `The event series is presented by the Town of Port Hedland and BHP, and event managed by PPP Events.The markets are held under ambient festoon lighting in the park, providing visitors with the opportunity to enjoy a selection of delicious food options as the ships go by in the port. `,
      imageUrl: "sunset.jpg",
      venue: `West End's Marapikurrinya Park`,
      city: "Port Hedland",
      startDate: date,
      endDate: date.addDays(90),
      user: customer[1]._id,
    },
    {
      eventName: "Hedland Food Festival",
      description: `The festival will include a two-day culinary event where people can enjoy a variety of fare from different producers, as well as live music and activities. Celebrity chefs and food personalities, Mark Olive and Julie Goodwin, will feature at the event, conducting food demonstrations.`,
      imageUrl: "hedlandfoodfestival.png",
      venue: "Town Oval in Port Hedland",
      city: "Port Hedland",
      startDate: date,
      endDate: date.addDays(90),
      user: customer[1]._id,
    },
  ]);

  console.log("event seeded");
  await Menu.deleteMany();
  const menu = await Menu.insertMany([
    {
      name: "Sweet Chilli Chicken Burger ",
      description:
        "Grilled chicken breast with beetroot, shredded carrot, cos lettuce, tomato, Spanish onion, relish & sweet chilli mayo.",
      imageUrl: "sweetchillieburger.jpg",
      price: 10,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: "Crispy Bacon & Cheese beef burger ",
      description:
        "Grass-fed beef pattie with crispy bacon, tasty cheese, cos lettuce, tomato, Spanish onion, relish & herbed mayo.",
      imageUrl: "crispybaconburger.jpg",
      price: 10,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: "Impossible Cheeseburger ",
      description:
        "Plant-based, meat tasting Impossible pattie with tasty cheese, dill pickles, Spanish onion, Dijon mustard, fire roasted tomato sauce & egg mayo.",
      imageUrl: "impossiblecheeseburger.jpg",
      price: 10,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: `Famous Grill'd Chips - Snack`,
      description:
        "Thick-cut potato chips sprinkled with our signature herb mix.",
      imageUrl: "grillchipssnack.png",
      price: 10,
      isAvailable: true,
      comboPrice: 0,
    },
    {
      name: `Pepsi Max 600ml`,
      description: "",
      imageUrl: "pepsi.png",
      price: 5,
      isAvailable: true,
      comboPrice: 0,
    },
    {
      name: "GARLIC CHICKEN & BACON AIOLI PIZZA  ",
      description:
        "Succulent chicken, crispy rasher bacon, spinach & red onion, served on a zesty garlic & pizza sauce base, topped with a Garlic Parmesan Aioli",
      imageUrl: "garlicchicken_bacon_pizza.png",
      price: 20,
      isAvailable: true,
      comboPrice: 25,
    },
    {
      name: "MEGA MEATLOVERS PIZZA ",
      description:
        "Grilled chicken breast with beetroot, shredded carrot, cos lettuce, tomato, Spanish onion, relish & sweet chilli mayo.",
      imageUrl: "meetlovers.jpg",
      price: 20,
      isAvailable: true,
      comboPrice: 25,
    },
    {
      name: "HAWAIIAN PIZZA ",
      description:
        "A classic pairing of smoky leg ham & sweet pineapple pieces",
      imageUrl: "hawaiian.jpg",
      price: 20,
      isAvailable: true,
      comboPrice: 25,
    },
    {
      name: "SPICY VEG SUPREME PIZZA ",
      description:
        "Diced tomato, mushroom, capsicum, spinach, red onion & pineapple, served on a tomato & garlic base, topped with chilli flakes & spring onions",
      imageUrl: "vegpizza.jpg",
      price: 20,
      isAvailable: true,
      comboPrice: 25,
    },
    {
      name: "PERI PERI CHICKEN PIZZA ",
      description:
        "A flavoursome pairing of seasoned chicken pieces, Italian cherry tomatoes, sliced red onion & baby spinach, topped with a swirl of our addictive peri peri sauce",
      imageUrl: "peri_peri_chicken.jpg",
      price: 20,
      isAvailable: true,
      comboPrice: 25,
    },
    {
      name: "7UP 375ml ",
      description: "",
      imageUrl: "7_up.jpg",
      price: 5,
      isAvailable: true,
      comboPrice: 10,
    },
    {
      name: "Sunkist 375ml ",
      description: "",
      imageUrl: "sunkist.jpg",
      price: 5,
      isAvailable: true,
      comboPrice: 10,
    },
    {
      name: "Pulled Pork Wrap ",
      description:
        "Succulent, low and slow cooked pulled pork with a Memphis-style seasoning.",
      imageUrl: "Pulled_Pork.jpg",
      price: 15,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: "Chicken Schnitzel Wrap",
      description: "A hearty chicken schnitzel made with 100% chicken breast.",
      imageUrl: "Chicken_Schnitzel_Wrap.jpg",
      price: 15,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: "Veggie Delite® with Avo",
      description:
        "With creamy avocado and packed with your choice of wide selection of salads, cheese and sauces.",
      imageUrl: "Veggie_Delite_with_Avo_Wrap.jpg",
      price: 15,
      isAvailable: true,
      comboPrice: 20,
    },
    {
      name: "Coca-Cola 390mL ",
      description: "",
      imageUrl: "Coke_390ml.jpg",
      price: 5,
      isAvailable: true,
      comboPrice: 10,
    },
    {
      name: "Sprite 1.25L ",
      description: "",
      imageUrl: "Sprite125L.jpg",
      price: 5,
      isAvailable: true,
      comboPrice: 10,
    },
  ]);
  console.log("Menu seeded");
  await EventProgram.deleteMany();
  const program = await EventProgram.insertMany([
    {
      name: "Kids Face painting",
      description: `Kids can enjoy free facepainting`,
      startTime: "5.00 PM",
      endTime: "6.00 PM",
      fees: 0,
      event: event[0]._id,
    },
    {
      name: "Musical show",
      description: `Everyone can enjoy the music under the moon`,
      startTime: "6.00 PM",
      endTime: "7.00 PM",
      fees: 0,
      event: event[0]._id,
    },
    {
      name: "Rides",
      description: `There are variety of rides available for kids and adults`,
      startTime: "5.00 PM",
      endTime: "8.00 PM",
      fees: 5,
      event: event[0]._id,
    },
    {
      name: "Fireworks",
      description: `At the end of the day show ends with fireworks`,
      startTime: "8.00 PM",
      endTime: "8.10 PM",
      fees: 0,
      event: event[0]._id,
    },
    {
      name: "Kids Face painting",
      description: `Kids can enjoy free facepainting`,
      startTime: "5.00 PM",
      endTime: "6.00 PM",
      fees: 0,
      event: event[1]._id,
    },
    {
      name: "Entertainment puppet show",
      description: `Everyone can enjoy the show under the moon`,
      startTime: "6.00 PM",
      endTime: "7.00 PM",
      fees: 0,
      event: event[1]._id,
    },
    {
      name: "Musical show",
      description: `Everyone can enjoy the music under the moon`,
      startTime: "7.00 PM",
      endTime: "8.00 PM",
      fees: 0,
      event: event[1]._id,
    },
    {
      name: "Kids Face painting",
      description: `Kids can enjoy free facepainting`,
      startTime: "5.00 PM",
      endTime: "6.00 PM",
      fees: 0,
      event: event[2]._id,
    },
    {
      name: "Chef cook",
      description: `Everyone can enjoy cooking with chef`,
      startTime: "6.00 PM",
      endTime: "7.00 PM",
      fees: 0,
      event: event[2]._id,
    },
    {
      name: "Food exhibition",
      description: `Everyone can enjoy the exhibition`,
      startTime: "7.00 PM",
      endTime: "8.00 PM",
      fees: 0,
      event: event[2]._id,
    },
  ]);

  console.log("eventprogram seeded");

  await FoodVendors.deleteMany();
  const foodvendors = await FoodVendors.insertMany([
    {
      name: "Burger King",
      description: `Choose Your Own Freshy made burger and drink `,
      imageUrl: "subway-logo-new.png",
      bankAccountId: "34565756",
      bankBSB: "354-345",
      bankAccountName: "BurgerKing",
      menu: [menu[0]._id, menu[1]._id, menu[2]._id, menu[3]._id, menu[4]._id],
    },
    {
      name: "Domino",
      description: `Choose Your Own Freshy Baked pizza and drink `,
      imageUrl: "domino.png",
      bankAccountId: "34565756",
      bankBSB: "354-345",
      bankAccountName: "domino",
      menu: [
        menu[5]._id,
        menu[6]._id,
        menu[7]._id,
        menu[8]._id,
        menu[9]._id,
        menu[10]._id,
        menu[11]._id,
      ],
    },
    {
      name: "SubWay",
      description: `Choose Your Own Freshy Baked wraps and drink `,
      imageUrl: "subway-logo-new.png",
      bankAccountId: "34565756",
      bankBSB: "354-345",
      bankAccountName: "SubWay",
      menu: [
        menu[12]._id,
        menu[13]._id,
        menu[14]._id,
        menu[15]._id,
        menu[16]._id,
      ],
    },
  ]);
  console.log("food verndors seeded");

  process.exit();
});
