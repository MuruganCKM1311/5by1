
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@fboservices/inventory/category.service';
import { QueryData } from '@shared/util/query-data';
import { Subscription } from 'rxjs';
import { Category } from '@shared/entity/inventory/category';
import { ListQueryRespType } from '@fboutil/types/list.query.resp';
import { FilterItem } from '../../../directives/table-filter/filter-item';
import { FilterCategoryComponent } from '../filter-category/filter-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: [ './list-category.component.scss' ]
})

export class ListCategoryComponent {

  displayedColumns: string[] = [ 'parent.name', 'name', 'unit.name', 'hsnNumber', 'description' ];

  columnHeaders = {
    'parent.name': 'Parent',
    name: 'Name',
    'unit.name': 'Unit',
    hsnNumber: 'hsnNumber',
    description: 'description',
  }

  queryParams:QueryData = { };

  routerSubscription: Subscription;

  loading = true;

  categories:ListQueryRespType<Category> = {
    totalItems: 0,
    pageIndex: 0,
    items: []
  };

  filterItem: FilterItem;


  constructor(private activatedRoute : ActivatedRoute,
    private categoryService:CategoryService) { }

    private loadData = () => {

      this.loading = true;
      this.categoryService.list(this.queryParams).subscribe((categories) => {

        this.categories = categories;

        this.loading = false;


      }, (error) => {

        console.error(error);
        this.loading = false;

      });

    };

    ngOnInit(): void {

      this.filterItem = new FilterItem(FilterCategoryComponent, {});

    }


    ngAfterViewInit():void {

      this.activatedRoute.queryParams.subscribe((value) => {

        this.queryParams = { ...value,
          include: [ {relation: 'parent'}, {relation: 'unit'} ] };
        this.loadData();

      });


    }


}
