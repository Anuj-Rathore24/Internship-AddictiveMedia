# Internship-AddictiveMedia 

Internship assignment!

1. Input page
  A basic form with the following fields:
    a. Name
    b. Date of Birth (use datepicker)
    c. An input for the countries
      i. Create an api in your backend which will fetch the list of countries.
      (Use the following link https://css-tricks.com/snippets/javascript/array-of-country-names/
      This contains an array of all countries along with their codes)
      ii. The country input needs to be an auto suggested text field (which
      basically means the content of the dropdown should change
      dynamically based on user input).
    d. File upload - Resume
      On submitting the form, data should be stored in sql database (use of sequelize would be
      appreciated).
2. Listing page
  A list of all the received submissions
    1. There should be two filters which would sort the list on the basis of
    date/time added and Name of the user alphabetically.
    2. Along with the details, there should be links to view the resume in a new
    tab and to download the resume.
    3. A delete button to delete the corresponding entry from the list.



## How to run app

1)Clone this Repository
2)run npm install
3)create a creds.json file in main folder and populate it with content like this
  {
    "newCreds":{
        "host":"",
        "Name": "",
        "Username": "",
        "Password": "",
        "Port number": "3306"
    }
}
4)run npm start
5)open localhost on port 5000(http://localhost:5000/)
## Approach

  For File management, used multer and for viewing and downloading file, simply used express functions.
  For database, used sequelize and freemysqlhosting.net for hosting mysql!
  Simple DOM manipulation for dynmically changing HTML.
  
  
### Website->https://internship-addictivemedia.herokuapp.com/
