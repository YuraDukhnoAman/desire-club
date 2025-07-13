import { MenuItem } from "@/components/ui/MenuSection";

export interface AlcoholItem {
  name: string;
}

export interface AlcoholCategory {
  category: string;
  items: AlcoholItem[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[] | AlcoholCategory[];
  isAlcohol?: boolean;
}

export const menuData: MenuCategory[] = [
  {
    category: "appetizers",
    items: [
      {
        id: "beef_carpaccio",
        name: "items.beef_carpaccio.name",
        description: "items.beef_carpaccio.description",
      },
      {
        id: "cheese_platter",
        name: "items.cheese_platter.name",
        description: "items.cheese_platter.description",
      },
      {
        id: "pickled_assortment",
        name: "items.pickled_assortment.name",
        description: "items.pickled_assortment.description",
      },
      {
        id: "edamame",
        name: "items.edamame.name",
        description: "items.edamame.description",
      },
      {
        id: "focaccia",
        name: "items.focaccia.name",
        description: "items.focaccia.description",
      },
    ],
  },
  {
    category: "hot_appetizers",
    items: [
      {
        id: "french_fries",
        name: "items.french_fries.name",
        description: "items.french_fries.description",
      },
      {
        id: "ohm_fries",
        name: "items.ohm_fries.name",
        description: "items.ohm_fries.description",
      },
      {
        id: "stuffed_portobello",
        name: "items.stuffed_portobello.name",
        description: "items.stuffed_portobello.description",
      },
      {
        id: "calamari_rings",
        name: "items.calamari_rings.name",
        description: "items.calamari_rings.description",
      },
      {
        id: "fried_platter",
        name: "items.fried_platter.name",
        description: "items.fried_platter.description",
      },
      {
        id: "chicken_wings",
        name: "items.chicken_wings.name",
        description: "items.chicken_wings.description",
      },
      {
        id: "baked_nachos",
        name: "items.baked_nachos.name",
        description: "items.baked_nachos.description",
      },
      {
        id: "fried_halloumi",
        name: "items.fried_halloumi.name",
        description: "items.fried_halloumi.description",
      },
    ],
  },
  {
    category: "salads",
    items: [
      {
        id: "caesar_salad",
        name: "items.caesar_salad.name",
        description: "items.caesar_salad.description",
      },
      {
        id: "greek_salad",
        name: "items.greek_salad.name",
        description: "items.greek_salad.description",
      },
      {
        id: "caprese_salad",
        name: "items.caprese_salad.name",
        description: "items.caprese_salad.description",
      },
      {
        id: "vegetable_assortment",
        name: "items.vegetable_assortment.name",
        description: "items.vegetable_assortment.description",
      },
    ],
  },
  {
    category: "main_courses",
    items: [
      {
        id: "creamy_shrimp",
        name: "items.creamy_shrimp.name",
        description: "items.creamy_shrimp.description",
      },
      {
        id: "grilled_shrimp",
        name: "items.grilled_shrimp.name",
        description: "items.grilled_shrimp.description",
      },
      {
        id: "seafood_mix",
        name: "items.seafood_mix.name",
        description: "items.seafood_mix.description",
      },
      {
        id: "homemade_pelmeni",
        name: "items.homemade_pelmeni.name",
        description: "items.homemade_pelmeni.description",
      },
      {
        id: "potato_vareniki",
        name: "items.potato_vareniki.name",
        description: "items.potato_vareniki.description",
      },
      {
        id: "cheese_vareniki",
        name: "items.cheese_vareniki.name",
        description: "items.cheese_vareniki.description",
      },
      {
        id: "desire_burger",
        name: "items.desire_burger.name",
        description: "items.desire_burger.description",
      },
      {
        id: "halloumi_burger",
        name: "items.halloumi_burger.name",
        description: "items.halloumi_burger.description",
      },
      {
        id: "fish_and_chips",
        name: "items.fish_and_chips.name",
        description: "items.fish_and_chips.description",
      },
      {
        id: "turkey_strips",
        name: "items.turkey_strips.name",
        description: "items.turkey_strips.description",
      },
      {
        id: "chicken_steak",
        name: "items.chicken_steak.name",
        description: "items.chicken_steak.description",
      },
      {
        id: "chorizo",
        name: "items.chorizo.name",
        description: "items.chorizo.description",
      },
      {
        id: "entrecote_steak",
        name: "items.entrecote_steak.name",
        description: "items.entrecote_steak.description",
      },
    ],
  },
  {
    category: "pizza_pasta",
    items: [
      {
        id: "margherita_pizza",
        name: "items.margherita_pizza.name",
        description: "items.margherita_pizza.description",
      },
      {
        id: "meat_pizza",
        name: "items.meat_pizza.name",
        description: "items.meat_pizza.description",
      },
      {
        id: "shrimp_special_pizza",
        name: "items.shrimp_special_pizza.name",
        description: "items.shrimp_special_pizza.description",
      },
      {
        id: "napolitana_pizza",
        name: "items.napolitana_pizza.name",
        description: "items.napolitana_pizza.description",
      },
      {
        id: "greek_pizza",
        name: "items.greek_pizza.name",
        description: "items.greek_pizza.description",
      },
      {
        id: "fungi_pasta",
        name: "items.fungi_pasta.name",
        description: "items.fungi_pasta.description",
      },
      {
        id: "seafood_pasta",
        name: "items.seafood_pasta.name",
        description: "items.seafood_pasta.description",
      },
    ],
  },
  {
    category: "desserts",
    items: [
      {
        id: "triple_chocolate",
        name: "items.triple_chocolate.name",
        description: "items.triple_chocolate.description",
      },
      {
        id: "toffee_crunch",
        name: "items.toffee_crunch.name",
        description: "items.toffee_crunch.description",
      },
      {
        id: "red_velvet",
        name: "items.red_velvet.name",
        description: "items.red_velvet.description",
      },
      {
        id: "apple_pie",
        name: "items.apple_pie.name",
        description: "items.apple_pie.description",
      },
      {
        id: "creme_brulee",
        name: "items.creme_brulee.name",
        description: "items.creme_brulee.description",
      },
      {
        id: "passion_fruit",
        name: "items.passion_fruit.name",
        description: "items.passion_fruit.description",
      },
      {
        id: "fruit_platter",
        name: "items.fruit_platter.name",
        description: "items.fruit_platter.description",
      },
    ],
  },
  {
    category: "alcohol",
    isAlcohol: true,
    items: [
      {
        category: "vodka",
        items: [
          {
            name: "Grey Goose",
          },
          {
            name: "Double Espresso",
          },
          {
            name: "Pineapple",
          },
          {
            name: "Acai",
          },
        ],
      },
      {
        category: "rum",
        items: [
          {
            name: "Bacardi",
          },
          {
            name: "Bacardi Spiced",
          },
          {
            name: "Captain Morgan",
          },
        ],
      },
      {
        category: "gin",
        items: [
          {
            name: "Gordons",
          },
          {
            name: "Hendrix",
          },
          {
            name: "Bombay",
          },
        ],
      },
      {
        category: "tequila",
        items: [
          {
            name: "Cuervo gold\\silver",
          },
          {
            name: "Patron Silver",
          },
          {
            name: "Patron Aniejo",
          },
        ],
      },
      {
        category: "liquers",
        items: [
          {
            name: "Baileys",
          },
          {
            name: "Kahlua",
          },
          {
            name: "Midori",
          },
          {
            name: "Southern Comfort",
          },
          {
            name: "Bad Apfel",
          },
          {
            name: "Chartreuse",
          },
          {
            name: "Fidg",
          },
          {
            name: "Drambuie",
          },
          {
            name: "Coiuntreau",
          },
        ],
      },
      {
        category: "aperitif_digestif",
        items: [
          {
            name: "Martini Bianco",
          },
          {
            name: "Martini Rosso",
          },
          {
            name: "Martini Extra Dry",
          },
          {
            name: "Campari",
          },
          {
            name: "Jagermeister",
          },
          {
            name: "Aperol",
          },
          {
            name: "Becherovka",
          },
        ],
      },
      {
        category: "anis",
        items: [
          {
            name: "Arak",
          },
          {
            name: "Sambuca",
          },
          {
            name: "Abscent",
          },
        ],
      },
      {
        category: "wine_and_sparkling",
        items: [
          {
            name: "Chardonnay",
          },
          {
            name: "Giwurztraminer",
          },
          {
            name: "Merlot",
          },
          {
            name: "Cabernet Sauvignon",
          },
          {
            name: "Cava",
          },
          {
            name: "Lambrusco",
          },
          {
            name: "Prosecco",
          },
        ],
      },
    ],
  },
];
