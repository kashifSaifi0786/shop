export const areas = [
  {
    name: "Thane",
  },
  {
    name: "Pune",
  },
  {
    name: "Mumbai Suburban",
  },
  {
    name: "Nashik",
  },
  {
    name: "Nagpur",
  },
  {
    name: "Ahmednagar",
  },
  {
    name: "Solapur",
  },
];

export const categories = [
  {
    name: "Grocery",
  },
  {
    name: "Butcher",
  },
  {
    name: "Baker",
  },
  {
    name: "Chemist",
  },
  {
    name: "Stationary Shop",
  },
];

export const getData = () => {
  return [
    {
      id: 1,
      name: "Snow",
      area: "Thane",
      category: "Butcher",
      openDate: "Mon, 18 Aug 2014 15:41:54 GMT",
      closeDate: "Tue, 19 Aug 2023 15:41:54 GMT",
    },
    {
      id: 2,
      name: "Lannister",
      area: "Thane",
      category: "Baker",
      openDate: "Tue, 19 Aug 2014 15:41:54 GMT",
      closeDate: "Wed, 20 Aug 2014 15:41:54 GMT",
    },
  ];
};
