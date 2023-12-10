import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { Data } from ".";

@Injectable()
export class Dashboard {
    constructor(private router: Router, private route: ActivatedRoute) { }

    register(handle: (data: Data) => void) {
        const state = this.route.snapshot.root.firstChild
        handle((state ? state.data : { isAdmin: false }) as Data)
        
        return this.router.events.subscribe((event) => {
            if (event instanceof RoutesRecognized) {
                const state = event.state.root.firstChild
                handle((state ? state.data : { isAdmin: false }) as Data)
            }
        })
    }
}