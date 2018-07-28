const secrets = {
    // Gets the connection for the databade as a enviorment varible using .env
    dbUri: "mongodb://CheapCyborg:clubpen6@ds239681.mlab.com:39681/mern-comment-box" // Replaceable with the database connection string DONT COMIT TO GITHUB IF USED THAT WAY
};

export const getSecret = key => secrets[key];