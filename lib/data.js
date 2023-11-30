// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDir = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-cs55w13.pantheonsite.io/wp-json/2023-child/v1/special";
// "https://dev-cs55w13.pantheonsite.io/wp-json/2023-child/v1/special";
//"https://dev-srjc-fall-2022-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

  
// function returns ids for all json objects in array
export async function getAllIds() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    // console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
  
}

export async function getSortedList() {
  let jsonString;
  try {
    jsonString = await got(dataURL);
  } catch(error) {
    console.error(error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  const posts = {};

  // Aggregate posts by ID
  jsonObj.forEach(item => {
    if (!posts[item.ID]) {
      posts[item.ID] = {
        id: item.ID,
        title: item.post_title,
        meta: {}
      };
    }
    posts[item.ID].meta[item.meta_key] = item.meta_value;
  });

  // Convert the object into an array and sort it
  const sortedPosts = Object.values(posts).sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  return sortedPosts.map(post => {
    return {
      id: post.id.toString(),
      name: post.title
    }
  });
}




/*
export async function getSortedList() {

  let jsonString;
  try {
   
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  
  const jsonObj = JSON.parse(jsonString.body);



  jsonObj.forEach(function(item) {
    let x; // Declare x outside the try block
    try {
      x = '{"' + item.acf_fields + '"}'; // Initialize x here
      x = x.replaceAll(',', '","');
      x = x.replaceAll(':', '":"');
      console.log("Attempting to parse JSON:", x); // Debugging line
      let y = JSON.parse(x);
      item.acf_fields = y;
    } catch (error) {
      console.error("Error parsing JSON:", x, error); // x is now accessible here
    }
  });

  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });


  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}



*/



export async function getData(idRequested) {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}
