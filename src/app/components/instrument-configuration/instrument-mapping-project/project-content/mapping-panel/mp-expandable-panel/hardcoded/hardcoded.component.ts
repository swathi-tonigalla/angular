import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MappingService } from 'src/app/services/mapping.service';
import { PassMappingService } from 'src/app/services/pass-mapping.service';

@Component({
  selector: 'app-hardcoded',
  templateUrl: './hardcoded.component.html',
  styleUrls: ['./hardcoded.component.css']
})
export class HardcodedComponent implements OnInit {
  hdcodeForm: FormGroup;
  inputValue!: any;
  hrdcdResult: any;

  finalResult!: any;


  instrumetnTypes!: any;

  hardcodeseted: boolean = false;

  isFromMappin!: boolean;

  sendFinaResult: any[] = []

  isClose!: boolean;

  recivedStat!: boolean

  constructor(
    private fb: FormBuilder,
    private mappingService: MappingService,
    private passMapping: PassMappingService
  ) {
    this.hdcodeForm = this.fb.group({
      'hardcodedInput': ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.mappingService.getinstTyps.subscribe(selectedType => {
      this.instrumetnTypes = selectedType
    });
    this.passMapping.get_rest_hrd_data.subscribe(val => {
      this.isFromMappin = val;
    //  console.log( this.isFromMappin)
      
        this.hardcodeseted = false;
      
    });

    this.mappingService.gethrdStat.subscribe(status => {
      this.recivedStat = status

      if (this.recivedStat) {
       this.isClose = false;
       this.hdcodeForm.reset();
      this.hardcodeseted = false;
      }
    })

  }

  close() {
    this.isClose = true;
    this.hdcodeForm.reset();
    this.hardcodeseted = false;

  }

  onSetValues() {
    this.finalResult = {}
    this.inputValue = this.hdcodeForm.controls['hardcodedInput'].value
    const count = Object.keys(this.instrumetnTypes).length;
    //const indexCount = count-1;
    const tempResult = this.repeatStringNumTimes(this.inputValue + ',', count);

    this.hrdcdResult = tempResult.split(',');

    this.hrdcdResult.splice(count, 1);
    this.hardcodeseted = true;
    this.finalResult = { ...this.hrdcdResult }
    this.sendFinaResult.push(this.inputValue, this.finalResult)
    this.mappingService.sendHardcodedData(this.sendFinaResult);
    const harcodeValueisSeted = false;
    this.mappingService.status(harcodeValueisSeted)
    this.sendFinaResult = [];

    // console.log(this.finalResult);
  }

  reset() {
    this.hdcodeForm.reset();
  }


  repeatStringNumTimes(string: any, times: any) {
    var repeatedString = '';
    while (times > 0) {
      repeatedString += string;
      times--;
    }
    return repeatedString;
  }

  // space(event:any) {
  //   if(event.target.selectionStart === 0  && event.code === "Space"){
  //     event.preventDefault();
  //   }
  // }

}
