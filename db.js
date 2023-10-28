/**
 * open Database
 */
let db;
let openRequest = indexedDB.open("Todo", 1);

/**
 * openRequest -->success
 * openRequest -->error
 * openRequest -->upgradeneeded
 */
openRequest.addEventListener("success", (e) => {
  console.log("DB SUCCESS");
  db = openRequest.result;
});

openRequest.addEventListener("error", (e) => {
  console.log("DB Failure");
});

openRequest.addEventListener("upgradeneeded", (e) => {
  console.log("DB Upgradeneeded and also for initial DB creation");
  db = openRequest.result;

  db.createObjectStore("tasks", { keyPath: "id" });
});
/**
 * whenever you open your database
 * version was 1,
 * we didn't mentioned any version
 * it will always takes the latest version -> what do I mean here ? if you first set version to 2 then try to change the version to one in that case it will not take the older version , it always try to the version with the latest version
 * why did we do DB Upgradeneeded,BY default it will take the version as 1,
    when we open the database by default it will take the latest version as 1, initially if you don't have any databases for the first time it will come under db upgrade
 * first it will call the db upgrade event listener
 * after first time it will compare the version and db upgrade will not get called, it will directly call the db success
 */

/**
 * STEP 2:
 * Create ObjectStore
 * @description
 * ObjectStore can only be created inside upgrade needer
 * keyPath -> it should be unique to uniquely identify
 */

/**
 * STEP 3:
 * Make Transaction
 * @description
 *
 */
