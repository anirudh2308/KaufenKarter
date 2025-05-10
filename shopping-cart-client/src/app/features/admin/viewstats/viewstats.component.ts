import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { ChartService } from "./chart.service";

@Component({
  selector: "app-viewstats",
  templateUrl: "./viewstats.component.html",
  styleUrls: ["./viewstats.component.scss"],
})
export class ViewstatsComponent implements OnInit {
  products: any; //mattable
  users: any;
  purchases: any;

  categories = [];
  productspercategory = []; //piechart1

  totalproducts = 0;
  totalusers = 0;
  totalrevenue = 0; //odometer

  salespercategory = []; //doughnutchart1

  productnames = [];
  productquants = []; //bargraph1

  usernames = [];
  purchasesperuser = []; //linegraph1

  catsubcat = [];
  cat = [];
  subcatcount = []; //polarchart1

  pnames = [];
  psold = []; //mattable

  // ELEMENT_DATA = [
  //   { position: 1, name: "Hydrogen", price: 1.0079, sold: "H" },
  //   { position: 2, name: "Helium", price: 4.0026, sold: "He" },
  //   { position: 3, name: "Lithium", price: 6.941, sold: "Li" },
  //   { position: 4, name: "Beryllium", price: 9.0122, sold: "Be" },
  //   { position: 5, name: "Boron", price: 10.811, sold: "B" },
  //   { position: 6, name: "Carbon", price: 12.0107, sold: "C" },
  //   { position: 7, name: "Nitrogen", price: 14.0067, sold: "N" },
  //   { position: 8, name: "Oxygen", price: 15.9994, sold: "O" },
  //   { position: 9, name: "Fluorine", price: 18.9984, sold: "F" },
  //   { position: 10, name: "Neon", price: 20.1797, sold: "Ne" },
  // ];

  ELEMENT_DATA = [];

  displayedColumns: string[] = ["position", "name", "price", "sold"];
  dataSource = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
      labels: { fontColor: "black" },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = "";
          return label;
        },
      },
    },
  };
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
      labels: { fontColor: "black" },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = "";
          return label;
        },
      },
    },
  };
  // public pieChartLabels: Label[] = [
  //   ["Download", "Sales"],
  //   ["In", "Store", "Sales"],
  //   "Mail Sales",
  // ];
  // public pieChartData: number[] = [300, 500, 100];
  // public pieChartType: ChartType = "pie";
  // public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "#32a832",
        "#a83a32",
        "#ebcc34",
        "#0c4b8a",
        "#e0deb8",
        "#62cc87",
      ],
    },
  ];

  public doughnutChartColors = [
    {
      backgroundColor: [
        "#eba834",
        "#10357a",
        "#a10254",
        "#00a84c",
        "rgba(255,255,0,0.8)",
        "#cc629e",
      ],
    },
  ];

  public barChartColors = [
    {
      backgroundColor: [
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
        "#4e0061",
      ],
    },
  ];

  public polarChartColors = [
    {
      backgroundColor: [
        "#008a7e",
        "#10357a",
        "#a10254",
        "#e07400",
        "#f25449",
        "#cc629e",
      ],
    },
  ];

  public doughnutChartLabels: Label[] = ["Electronics", "Fashion"];
  public doughnutChartData = [350, 50, 250];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    legend: {
      position: "bottom",
      labels: { fontColor: "black" },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value, ctx) => {
          const label = "";
          return label;
        },
      },
    },
  };

  public polarChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
      labels: { fontColor: "black" },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = "";
          return label;
        },
      },
    },
  };

  public barChartPlugins = [pluginDataLabels];

  public barChartData = [
    {
      data: this.productquants,
      label: "No. of items per product",
    },
  ];

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public lineChartData = [
    { data: this.purchasesperuser, label: "No. of purchases per user" },
  ];
  public lineChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };
  public lineChartColors = [
    {
      // red
      backgroundColor: "rgba(255,191,0,0.6)",
      borderColor: "rgba(255,191,0,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    //No. of products per category
    this.chartService.getProducts().subscribe((data) => {
      this.products = data;
      for (let item of this.products) {
        if (!this.categories.includes(item["category"])) {
          this.categories.push(item["category"]);
          this.productspercategory.push(0);
        }
        this.productspercategory[this.categories.indexOf(item["category"])]++;
        this.totalproducts++;
        this.productnames.push(item["name"]);
        this.productquants.push(item["remaining"]);
      }

      for (let i of this.products) {
        if (!this.catsubcat.hasOwnProperty(i["category"])) {
          this.catsubcat[i["category"]] = [];
          this.cat.push(i["category"]);
          this.subcatcount.push(0);
        }
        if (!this.catsubcat[i["category"]].includes(i["subcategory"])) {
          this.catsubcat[i["category"]].push(i["subcategory"]);
          this.subcatcount[this.cat.indexOf(i["category"])]++;
        }
      }

      this.chartService.getUsers().subscribe((data) => {
        this.users = data;
        this.totalusers = this.users.length;

        for (let user of this.users) this.usernames.push(user["name"]);

        this.chartService.getPurchases().subscribe((data) => {
          this.purchases = data;

          for (let purchase of this.purchases) {
            for (let item of purchase["total"]) this.totalrevenue += item;
          }

          for (let item of this.categories) this.salespercategory.push(0);

          for (let purchase of this.purchases) {
            for (let order of purchase["order"])
              for (let id of order)
                this.salespercategory[
                  this.categories.indexOf(this.products[id - 1]["category"])
                ]++;
          }

          for (let purchase of this.purchases) {
            this.purchasesperuser.push(purchase["order"].length);
          }

          this.pnames = this.productnames;

          for (let p of this.pnames) this.psold.push(0);

          for (let purchase of this.purchases)
            for (let i = 0; i < purchase["order"].length; i++)
              for (let j = 0; j < purchase["order"][i].length; j++)
                this.psold[purchase["order"][i][j] - 1] +=
                  purchase["quant"][i][j];

          for (let i = 0; i < this.psold.length - 1; i++)
            for (let j = 0; j < this.psold.length - i - 1; j++)
              if (this.psold[j] < this.psold[j + 1]) {
                let temp1 = this.psold[j];
                this.psold[j] = this.psold[j + 1];
                this.psold[j + 1] = temp1;

                let temp2 = this.products[j];
                this.products[j] = this.products[j + 1];
                this.products[j + 1] = temp2;
              }

          for (let prod of this.products) {
            this.ELEMENT_DATA.push({
              position: this.products.indexOf(prod) + 1,
              name: prod["name"],
              price: prod["price"],
              sold: this.psold[this.products.indexOf(prod)],
            });
          }

          this.dataSource = this.ELEMENT_DATA;
          console.log(this.ELEMENT_DATA);
        });
      });
    });
  }
}
