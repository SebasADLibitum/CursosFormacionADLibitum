import express, { Application } from 'express';
import routesCourses from '../routes/courses.routes';
import routesUsers from '../routes/users.routes';
import routesTeachers from '../routes/teachers.routes';
import routesRegisteredTeachers from '../routes/teachers-registered.routes';
import routesTypesCourses from '../routes/types-courses.routes';
import routesAuth from '../routes/auth.routes';
import cors from 'cors';
import morgan from 'morgan';

class Server {
    private app: Application;
    private port: string | undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`👌 Server on http://localhost:${this.port}/ 👌`);
        })
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/api/courses', routesCourses);
        this.app.use('/api/types-courses', routesTypesCourses);
        this.app.use('/api/teachers', routesTeachers);
        this.app.use('/api/registered-teachers', routesRegisteredTeachers);
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/auth', routesAuth);
    }

}

export default Server;

