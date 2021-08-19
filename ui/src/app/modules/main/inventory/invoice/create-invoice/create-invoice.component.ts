import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '@fboservices/inventory/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from '@shared/entity/inventory/invoice';
import { Customer } from '@shared/entity/inventory/customer';
import { CustomerService } from '@fboservices/inventory/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@shared/entity/inventory/product';
import { ProductService } from '@fboservices/inventory/product.service';
import { goToPreviousPage as _goToPreviousPage } from '@fboutil/fbo.util';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: [ './create-invoice.component.scss', '../../../../../util/styles/fbo-form-style.scss' ]
})
export class CreateInvoiceComponent implements OnInit {

  goToPreviousPage = _goToPreviousPage;

  formHeader = 'Create Invoices';

  loading = true;

  customers: Array<Customer> = [];

  fboForm: FormGroup;

  displayedColumns: string[] = [ 'product', 'quantity', 'unitPrice', 'discount', 'totalAmount' ];

 dataSource = new MatTableDataSource<AbstractControl>();

 productsFiltered: Array<Product>;

 // Items = this.fboForm.get('items') as FormArray;

 constructor(public readonly router: Router,
  public readonly route: ActivatedRoute,
    private readonly fBuilder: FormBuilder,
    private readonly invoiceService:InvoiceService,
    private readonly productService:ProductService,
    private readonly customerService:CustomerService,
    private readonly toastr: ToastrService) { }

    private createSaleItemForm = ():FormGroup => {

      const product = this.fBuilder.control('');
      product.valueChanges.subscribe((value) => {

        this.productService.list({qrs: value}).subscribe((productsP) => (this.productsFiltered = productsP));

      });
      return this.fBuilder.group({
        product,
        unitPrice: this.fBuilder.control(''),
        unit: this.fBuilder.control(''),
        quantity: this.fBuilder.control(''),
        discount: this.fBuilder.control(''),
        totalTax: this.fBuilder.control(''),
        totalAmount: this.fBuilder.control(''),
        batchNumber: this.fBuilder.control(''),
      });

    }

    ngOnInit(): void {

      this.fboForm = this.fBuilder.group({
        _id: new FormControl(null),
        invoiceDate: this.fBuilder.control('', [ Validators.required ]),
        dueDate: this.fBuilder.control(''),
        invoiceNumber: this.fBuilder.control('', [ Validators.required ]),
        notes: this.fBuilder.control(''),
        isReceived: this.fBuilder.control(''),
        customer: new FormControl('', [ Validators.required ]),
        items: this.fBuilder.array([
          this.createSaleItemForm(),
        ])
      });

      const formArray = this.fboForm.get('items') as FormArray;
      this.dataSource = new MatTableDataSource(formArray.controls);

      const tId = this.route.snapshot.queryParamMap.get('id');
      if (tId) {

        this.formHeader = 'Update Invoices';

      }
      this.customerService.listAll().subscribe((customers) => {

        this.customers = customers;
        if (tId) {

          this.loading = true;
          this.invoiceService.get(tId).subscribe((itemC) => {

            /*
             * This.fboForm.setValue({_id: itemC._id,
             *   Customer: itemC.customer ?? ''});
             * ItemC.items?.forEach((item) => {
             */

            /*
             *   Const control = new FormControl('', Validators.required);
             *   This.items.push(control);
             */

            // });

            this.loading = false;

          });

        } else {

          this.loading = false;

        }

      });


    }

    upsertInvoice(): void {

      if (!this.fboForm.valid) {

        return;

      }
      this.loading = true;
      const itemP = <Invoice> this.fboForm.value;
      (itemP._id ? this.invoiceService.update(itemP) : this.invoiceService.save(itemP)).subscribe((itemC) => {

        this.toastr.success(`Invoice ${itemC.invoiceNumber} is saved successfully`, 'Invoice saved');
        this.goToPreviousPage(this.route, this.router);

      }, (error) => {

        this.loading = false;
        this.toastr.error(`Error in saving invoice ${itemP.invoiceNumber}`, 'Invoice not saved');
        console.error(error);

      });

    }

    extractNameOfProduct = (prod: Product): string => prod.name;

    handleProductSelect = (prod: Product, pos: number): void => {

      const itemsFormArray = <FormArray> this.fboForm.get('items');
      const formControl = itemsFormArray.get([ pos ]);
      formControl.get('quantity').setValue(1);

    }

}
