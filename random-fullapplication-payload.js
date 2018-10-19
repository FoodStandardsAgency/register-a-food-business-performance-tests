'use strict';
var Faker = require('faker');
var randomstring = require("randomstring");
module.exports = {
    generateRandomPayload
};
function cleanInt(x) {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}
function generateRandomPayload( userContext, events, done) {
    let env = process.env.env;
    let apiSecret = process.env.apiSecret;
    let qaKey = process.env.qaKey;

    userContext.vars.apiSecret = apiSecret;
    userContext.vars.env = env;
    userContext.vars.thinktime = cleanInt(process.env.thinktime);
    userContext.vars.duration = cleanInt(process.env.duration);

    var establishment_details = {
        "establishment_trading_name": "Itsu",
        "establishment_primary_number": "329857245",
        "establishment_secondary_number": "84345245",
        "establishment_email": "fsatestemail.valid@gmail.com",
        "establishment_opening_date": "2018-06-07"
    };

    establishment_details.establishment_trading_name = Faker.company.companyName();
    establishment_details.establishment_primary_number = Faker.random.number({min: 111111111, max: 555555555});
    establishment_details.establishment_secondary_number = Faker.random.number({min: 666666666, max: 888888888});
    establishment_details.establishment_email = Faker.internet.email();
    establishment_details.establishment_opening_date = Faker.date.between('2000-01-01', '2025-12-31');

    var operator = {
        "operator_first_name": "Fred",
        "operator_last_name": "Bloggs",
        "operator_postcode": "SW12 9RQ",
        "operator_first_line": "335",
        "operator_street": "Some St.",
        "operator_town": "London",
        "operator_primary_number": "9827235",
        "operator_email": "fsatestemail.valid@gmail.com",
        "operator_type": "Sole trader"
    };

    operator.operator_first_name = Faker.name.firstName();
    operator.operator_last_name = Faker.name.lastName();
    operator.operator_postcode = Faker.random.arrayElement(["EC1A 1BB", "W1A 0AX", "M1 1AE", "B33 8TH", "CR2 6XH", "DN55 1PT"]);
    operator.operator_first_line = Faker.address.streetAddress("###");
    operator.operator_street = Faker.address.city();
    operator.operator_town = Faker.address.county();
    operator.operator_type = Faker.random.number({min: 888888889, max: 999999999});
    operator.operator_email = Faker.internet.email();
    operator.operator_type = Faker.random.arrayElement(["Sole trader", "Sole trader", "Sole trader", "Sole trader", "Sole trader", "Sole trader"]);


    var premise = {
        "establishment_postcode": "SW12 9RQ",
        "establishment_first_line": "123",
        "establishment_street": "Street",
        "establishment_town": "London",
        "establishment_type": "Home or domestic premises"

    };

    premise.establishment_first_line = Faker.address.streetAddress("###");
    premise.establishment_postcode = Faker.random.arrayElement(["EC1A 1BB", "W1A 0AX", "M1 1AE", "B33 8TH", "CR2 6XH", "DN55 1PT"]);
    premise.establishment_street = Faker.address.city();
    premise.establishment_town = Faker.address.county();
    premise.establishment_type = Faker.random.arrayElement(["Home or domestic premises", "Home or domestic premises", "Home or domestic premises"]);

    var activities = {
        "customer_type": "End consumer",
        "business_type": "Restaurant, cafe, canteen or fast food",
        "import_export_activities":"Directly import",
        "opening_day_monday":true,
        "opening_day_tuesday":true,
        "opening_day_wednesday":true,
        "opening_day_thursday":true,
        "opening_day_friday":true,
        "opening_day_saturday":false,
        "opening_day_sunday":false
    };

    activities.business_type = Faker.random.arrayElement(["Restaurant, cafe, canteen or fast food", "Restaurant, cafe, canteen or fast food", "Restaurant, cafe, canteen or fast food"]);
    activities.customer_type = Faker.random.arrayElement(["End consumer", "End consumer", "End consumer"]);

    var establishment = {
        "operator": operator,
        "premise": premise,
        "activities": activities
    };

    var metadata = {
        "declaration1": "Declaration",
        "declaration2": "Declaration",
        "declaration3": "Declaration"
    };

    metadata.declaration1 = randomstring.generate();

    metadata.declaration2 = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });

    metadata.declaration3 = randomstring.generate({
        charset: 'abc123!@£'
    });

    var registration = {
        "establishment": establishment,
        "metadata": metadata
    };

    var payload = {
        "registration" : registration,
        "local_council_url":"west-dorset"
    }

    userContext.vars.payload = payload;

    const datasets = {
        "registration-summary": {
            operator_type: "A company",
            operator_company_name: "My company Ltd.",
            operator_first_line: "First line",
            operator_street: "Street",
            operator_town: "Town",
            operator_postcode: "AA11 1AA",
            operator_company_house_number: "AA123456",
            operator_charity_name: "My charity",
            operator_charity_number: "123456",
            operator_first_name: "Joe",
            operator_last_name: "Bloggs",
            operator_primary_number: "01234567890",
            operator_email: "email@email.com",
            registration_role: "Representative",
            establishment_trading_name: "Trading name",
            establishment_first_line: "First line",
            establishment_street: "Street",
            establishment_town: "Town",
            establishment_postcode: "AA11 1AA",
            establishment_type: "domestic",
            business_type: "Livestock farm"
        },
        declaration: {
            operator_first_name: "Fred",
            operator_last_name: "Bloggs",
            operator_postcode: "AA11 1AA",
            operator_first_line: "11",
            operator_street: "Some Street",
            operator_town: "London",
            operator_primary_number: "01234567890",
            operator_email: "testemail@email.com",
            operator_type: "Sole Trader",
            registration_role: "A person",
            establishment_trading_name: "Trading name",
            establishment_email: "establishment@email.com",
            establishment_primary_number: "01234567890",
            establishment_first_line: "First line",
            establishment_street: "Street",
            establishment_town: "Town",
            establishment_postcode: "AA11 1AA",
            establishment_type: "domestic",
            supply_directly: "true",
            supply_other: "true",
            business_type: "Livestock farm",
            customer_type: "End Consumer",
            day: "01",
            month: "01",
            year: "2001",
            directly_import: "Directly import"
        }
    };

    const encode = obj => {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    userContext.vars.registrationsummarypathparam = encode(datasets["registration-summary"]);
    userContext.vars.declarationpathparam =  encode((datasets.declaration));
    userContext.vars.qakey = qaKey.replace(/\&/gi, '%26');

    return done();
}
