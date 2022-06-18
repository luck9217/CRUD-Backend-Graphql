import app from './app';
import {connectDB} from './db'
import {PORT} from './config'

async function main (){

    try {
        
        await connectDB.initialize();
        console.log('Database Connected');
        
        app.listen(PORT);
        console.log('Listening on port, ',PORT);
    } catch (error) {
    
        console.log(error);
}


}

main ();