const listEvent = [
  {
    "nameEvent": "evento 1",
    "free": false,
    "price": 18.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": false,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2022/02/12",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "atributionsPhoto": "algo",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento 2",
    "free": true,
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2021/02/06",
    "dateFinal": "2022/12/06",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento no valido",
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2021/02/06",
    "dateFinal": "2022/12/06",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento caducado",
    "free": true,
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2022/01/14",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento 3",
    "free": true,
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2022/03/10",
    "dateFinal": "2022/03/12",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento 4, todo el año",
    "free": true,
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2022/01/01",
    "dateFinal": "2022/12/31",
    "comments": "comentarios",
    "category": [
      "Music"
    ],
    "photoEvent": "link",
    "linkTickets": "link"
  },
  {
    "nameEvent": "evento no valido, no hay array",
    "free": true,
    "price": 10.0,
    "site": "Dirección.",
    "cityLocation": "Ciudad",
    "village": true,
    "hoursOpen": "21:00",
    "hoursClose": "23:30",
    "dateStart": "2022/01/01",
    "dateFinal": "2022/12/31",
    "comments": "comentarios",
    "category": "Music",
    "photoEvent": "link",
    "linkTickets": "link"
  }
]
module.exports = { listEvent }
