import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms'
import { animate, transition, state, trigger, style, keyframes } from '@angular/animations'
import { Router } from '@angular/router';
@Component({
    selector: 'pt-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    animations: [
        trigger("turnOnWidth", [
            state("activeWidth", style(
                {
                    width: 230,
                    opacity: 1
                }
            )),
            state('inactiveWidth', style(
                {
                    width: 0,
                    opacity: 0
                }
            )),
            transition("activeWidth <=> inactiveWidth", animate(300))
        ]),
        trigger('handleError', [
            state('valid', style(
                { transform: 'translate(0)' }
            )),
            state('invalid', style(
                { transform: 'translate(0)' }
            )),
            transition("valid <=> invalid", animate(200, keyframes(
                [
                    style(
                        { transform: 'translate(10px)' }
                    ),
                    style(
                        { transform: 'translate(-10px)' }
                    ),
                    style(
                        { transform: 'translate(0)' }
                    )
                ]
            )))
        ])

    ]
})
export class SearchFormComponent implements OnInit {

    public searchForm: FormGroup;
    public inputField: AbstractControl;
    public stateInput: string = "valid";
    public toggleIcon: boolean = true;
    @Input("sidenavSearch") sidenavSearch: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    public state: string = 'inactiveWidth';

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.searchForm = this.formBuilder.group({
            inputField: []
        });
        this.inputField = this.searchForm.controls['inputField'];

    }
    activeInput() {
        this.toggleIcon = !this.toggleIcon;
        if (this.toggleIcon) {
            this.inputField.setValue(null);
        }
        this.state = (this.state === 'inactiveWidth' ? 'activeWidth' : 'inactiveWidth');
    }
    // search
    sendKeyword(event) {
        if (event.keyCode === 13) {
            // close sidenav Search
            let widthWindow = event.view.outerWidth;
            // get value from search input
            let value = event.target.value;
            if (value !== "") {
                // format keyword
                let keyword = this.formatKeyword(value);
                // go to SearchComponent
                this.router.navigate(['search', keyword]);
                if (widthWindow < 992) {
                    this.sidenavSearch.close();
                }
                console.log(keyword)
            }
            else {
                // input empty
                this.stateInput = (this.stateInput === "valid" ? "invalid" : "valid");
            }

        }
    }
    // remove space and replace by "-"
    formatKeyword(keyword: string): string {
        let arrayKeyword: string[] = keyword.split(" ");
        let result = arrayKeyword.join("_");
        return result;
    }

}
