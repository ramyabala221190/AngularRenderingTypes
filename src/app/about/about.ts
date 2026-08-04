import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-about',
  imports: [TimelineModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

events:{year:number,description:string}[]=[
  {year:2023,description:"Founded: ShopLight formed to explore high-performance e‑commerce"},
  {year:2024, description: "MVP Launch: Launched first catalog and checkout with 100 early users"},
  {year:2025, description: "Performance POC: Implemented SSR + prerendering for marketing & product pages"},
  {year: 2026, description:"Growth & Testing: Running experiments on personalization and checkout flows"}
]

}
