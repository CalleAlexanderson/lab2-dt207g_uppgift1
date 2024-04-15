# API som hanterar tidigare jobbposter
Detta repo innehåller kod ett REST API byggt med Express och stöd för CORS. API:et hanterar de olika jobbposter jag haft sedan gymnasiet. 
CRUD (Create, Read, Update, Delete) är implementerad men det finns ingen update funktion mot API:et.

## Installation, databas
API:et använder en MySQL-databas för att lagra data.
Klona ner repot, kör kommandot npm install för att installera de npm-paket som används. 
Kör filen install.js för att skapa denna tabell i databasen:
|Tabell-namn|Fält  |
|--|--|
|work  | **id** (INTEGER, **companyname** (varchar(255), **jobtitle** (varchar(255), **location** (varchar(255), **description** (varchar(255)  |

install.js skapar även två jobbposter som sedan läggs in i tabellen.

## Användning
Nedan finns de olika sätt API:et kan anropas

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/api         |Visar ett välkomst meddelande för att se att API är igång                                                     |
|GET    |/api/workplaces |Hämtar alla jobbposter som ligger i tabellen work                                              |
|POST   |/api/workplaces |Lagrar en ny jobbpost i databasen. kräver ett objekt med rätt format för MySql skickas med.                            |
|DELETE |/api/workplaces/:id |Raderar en jobbpost från databasen där id matcher det som skickats med i länken.                                                       |

Både den data som skickas mot och tas emot från API:et är i json format och kan se ut såhär:
```
{
   ID: 1,
   companyname: "Axfood",
   description: "Plockteam och kassa arbete",
   jobtitle: "Butiksmedarbetare",
   location: "Kungenskurva"
}
