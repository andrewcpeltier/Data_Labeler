import { Component, OnInit, ViewChild } from '@angular/core';
import { PageHostDirective } from 'src/app/directives/page-host.directive';
import { InfoTab } from 'src/app/models/InfoTab';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @ViewChild(PageHostDirective, {static: true}) overviewHost: PageHostDirective;

  overviewTab: InfoTab = {
    firstBodyTitle: 'Overview',
    firstBodyContent: `The Cartoon Labeler is a progressive web application that allows the user to label cartoon images and create a dataset that can be used to train deep learning models.
    The application uses Google Firebase for its various web services, like hosting, authentication, and database operations. Currently, the AI model is trained in a separate Python script that isn’t executable by the application.
    Instead, Google Firebase exports the labels made by the application, which are then used to label local copies of the images. A Python script then assigns those labels to images and then uses them to train and test an AI model.
    The future of the application as of right now is uncertain. It will most likely follow suit with how I want to pursue different technologies, as it has in the past.
    The app could be migrated to AWS where it may be easier to add different users and incorporate the AI model in the application itself, or a mid-tier and
    backend could be independently established to achieve the same goal. There may be an opportunity to add different datasets that multiple users can label and switch between. However, as of right now,
    this dataset allows me as the developer to train a single dataset so that I can train my own AI model for my own research.`,
    firstBodyAsset: null,
    secondBodyTitle: 'Data Flow',
    secondBodyContent: `Google’s Cartoon Set (https://google.github.io/cartoonset/people.html), an image dataset composed of cartoon faces with random facial features, is downloaded both to my local computer and in Google Firestore, Firebase’s cloud storage platform.
    The Cartoon Labeler pulls these images down from Firestore to use in the application. Once the user authenticates themselves in the login screen, they can gain access to the site to label the data. The user can label an image based on the classifications the model is trying to learn.
    Once the label is set, the image id and it’s label is assigned to the user’s account using Firebase’s realtime database. A json file can be downloaded using admin privileges when signed onto the Firebase Console.
    From there, the Python script that trains the AI model handles the rest. To run this script, the json file with the dataset’s labels needs to be passed as input, and the cartoon dataset needs to be loaded onto the computer that is running the script with the images in the user’s directory.
    The script will then read the json file and assign the cartoon images to a new directory based on their given label. The script will then use these directories to create a dataset using Tensorflow’s image library, and the training will start. This script can also run a pretrained model after you have already trained one, so the model can be tested and analyzed without being trained first.
    This page contains a detailed description of the different trials that the model has gone through. Each page will demonstrate a stage in the AI model’s development, including what the accuracy of the model currently is and how I tried to increase the performance of the model.
    `,
    secondBodyAsset: null,
  }
  trialOne: InfoTab = {
    firstBodyTitle: 'Trial 1',
    firstBodyContent: '',
    firstBodyAsset: null,
    secondBodyTitle: null,
    secondBodyContent: null,
    secondBodyAsset: null,
  }
  trialTwo: InfoTab = {
    firstBodyTitle: 'Trial 2',
    firstBodyContent: '',
    firstBodyAsset: null,
    secondBodyTitle: null,
    secondBodyContent: null,
    secondBodyAsset: null,
  }

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.assetService.getAssetReferenceByName("Sample of Predictions").getDownloadURL().then(url => {
      this.overviewTab.firstBodyAsset = url;
    });
  }

}
