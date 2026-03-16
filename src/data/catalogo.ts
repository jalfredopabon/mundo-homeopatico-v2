// src/data/catalogo.ts

export interface LinkItem {
  name: string;
  href: string;
}

export interface CatalogGroup {
  id: string;
  name: string;
  hasIcon?: boolean;
  iconType?: string;
  links?: LinkItem[];
  href?: string; 
}

export interface CatalogSection {
  title: string;
  subsections: {
    title: string;
    groups: CatalogGroup[];
  }[];
}

export const CATALOGO_DATA: CatalogSection[] = [
  {
    title: "De nuestra farmacia",
    subsections: [
      {
        title: "Según prescripción",
        groups: [
          {
            id: "homeopaticos",
            name: "Homeopáticos",
            hasIcon: true,
            iconType: "test-tube",
            links: [
              { name: "Oficinales", href: "#oficinales" },
              { name: "Multipotencias", href: "#multipotencias" },
              { name: "Magistrales", href: "#magistrales" },
            ]
          },
          {
            id: "esencias-florales",
            name: "Esencias florales",
            hasIcon: true,
            iconType: "flower",
            href: "#esencias-florales"
          },
          {
            id: "oligoelementos",
            name: "Oligoelementos",
            hasIcon: true,
            iconType: "molecules",
            href: "#oligoelementos"
          },
        ]
      },
      {
        title: "Línea MH",
        groups: [
          {
            id: "homeopatia-mh",
            name: "Homeopatía",
            hasIcon: true,
            iconType: "test-tube",
            links: [
              { name: "Homeopáticos esenciales", href: "#homeopaticos-esenciales" },
              { name: "Homeopáticos especiales", href: "#homeopaticos-especiales" },
              { name: "Cuidado capilar", href: "#cuidado-capilar" },
              { name: "Cápsulas", href: "#capsulas" },
              { name: "Cremas", href: "#cremas" },
              { name: "Geles", href: "#geles" },
              { name: "Ungüentos", href: "#unguentos" },
              { name: "Elíxires", href: "#elixires" },
            ]
          },
          {
            id: "esencias-florales-lmh",
            name: "Esencias florales",
            hasIcon: true,
            iconType: "flower",
            href: "#esencias-florales-lmh"
          },
          {
            id: "oligoelementos-k7",
            name: "Oligoelementos K7",
            hasIcon: true,
            iconType: "molecules",
            href: "#oligoelementos-k7"
          }
        ]
      }
    ]
  },
  {
    title: "Productos exclusivos",
    subsections: [
      {
        title: "Complementarios",
        groups: [
          {
            id: "alimentos-funcionales",
            name: "Alimentos funcionales",
            hasIcon: true,
            iconType: "leaf",
            href: "#alimentos-funcionales"
          },
            {
            id: "cbd",
            name: "CBD",
            hasIcon: true,
            iconType: "cannabis",
            href: "#cbd"
          },
          {
            id: "aceites-esenciales",
            name: "Aceites esenciales",
            hasIcon: true,
            iconType: "droplet",
            href: "#aceites-esenciales"
          }
        ]
      }
    ]
  }
];
