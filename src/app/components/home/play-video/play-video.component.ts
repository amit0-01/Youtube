import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';
import { AddToPlaylistComponent } from '../add-to-playlist/add-to-playlist.component';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss']
})
export class PlayVideoComponent {

  userId: any;
  token: any;
  links: string[] = [];
  videoFile: string | null = null;
  comingData: any;
  videoId!: string
  comments: any;
  commentContent: string= ''
  likeVideo: boolean = false;
  isLikedComment: boolean = true;
  likedItems: string[] = [];
  user: any;
  subscribetoChannel: boolean = false
  VideoisLiked: boolean = false;
  isEditingComment: boolean = false;
  newContent: string = '';
  editingCommentId: number | null = null;
  constructor(private homeService: YoutubehomeService,
    private router: Router,
    private route: ActivatedRoute,
    private service: YoutubehomeService,
    private dialog: MatDialog,
    ) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);

      // Check if userData has _id property
      if (userData && userData.user && userData.user._id) {
        this.userId = userData.user._id;
        this.token = userData.accessToken;
      } else {
        console.log('Invalid userData format: missing user._id');
      }
    }

    this.route.queryParams.subscribe(params =>{
      console.log(params);
      
      this.videoFile = params['videoFile'];
      // console.log(this.videoFile);
      this.videoId = params['videoId'];
      // console.log(this.videoId);
      this.user = params['user']
    })
  }

  ngOnInit(): void {
     this.getLikedVideos();
     this.getComments();
     this.getSubscribedChannel()
    //  console.log(this.commentContent);
     
  }
 // check if video is liked or not 
  getLikedVideos(){
    this.service.getLikedVideos(this.videoId, this.token).subscribe((res:any) =>{
        if(res.likedVideos){
         this.VideoisLiked = true;       
         console.log('video is liked');
              
        } else{
          console.log('video is not liked');
          this.VideoisLiked = false
          
        }
    })
  }

  // get comments
  getComments(){
    this.service.getIndividualVideoComments(this.videoId,this.token)
    .subscribe((res:any)=>{
      this.comments = res.data;
      // console.log(this.comments);
      
      
    })
  }

  // add comment
  addComment(){
      this.service.addComment(this.videoId, this.token, this.commentContent)
      .subscribe((res:any) =>{
       if(res){
        this.getComments()
        this.commentContent=""
       }
      }) 
  }

  // like comment 
  likeComment(data:any){
    const commentId = data._id;
    this.service.liketheComment(data._id, this.token)
    .subscribe((response:any) =>{
          if (response.success && response.newLike) {
            this.likedItems.push(response.newLike.comment);
            // console.log(this.likedItems);
            
          } else if (response.success && !response.newLike) {
            this.likedItems = this.likedItems.filter(id => id !== commentId);
          }
        },
        (error) => {
          console.error('Error liking the comment:', error);
        }
      );
    }

    /// change the color if the the like is toogled
  
    isLiked(data: any): any {
      // console.log(data);
      return this.likedItems.includes(data._id);
    }



    /// toogle Subsription

    toogleSubscription(){
      this.service.toogleSubscription(this.user, this.token).subscribe((res:any) =>{
        if(res.message == "Subscribed to channel successfully"){
          this.subscribetoChannel = true
        } else if(res.message == "Unsubscribed from channel successfully"){
          this.subscribetoChannel = false;
        }
        
      })
    }

    // check if the channel is subscribed or not
    getSubscribedChannel(){
      this.service.getSubscribedChannel(this.user, this.token).subscribe((res:any) =>{
        if(res.data.length!= 0){
          this.subscribetoChannel = true;
           console.log('subscribed to channel');
           
        }
          else{
            this.subscribetoChannel = false;
            console.log('not Subscribed to chanhel');

          }        
      })
    }

    // toogle video like
    toogleLike(){
      this.service.toogleLike(this.videoId, this.token)
      .subscribe((res:any) =>{
       if(res.message == 'Video liked successfully'){
        this.VideoisLiked = true;
       } else if(res.message == "Video unliked successfully"){
        this.VideoisLiked = false;
       }
      })
    }

    // toogle input for comment

    openEditComment(data:any){
      console.log(data);
      this.editingCommentId = data._id
      this.newContent = data.content;
    }

    // cancel the edti comment
    cancelEdit(){
      this.editingCommentId = null;
      this.newContent = '';  
    }

    // edit comment 
    editComment(data: any){
     const obj= {
      commentId : data._id,
      content: this.newContent,
      token: this.token
     }
      this.service.editComment(obj).subscribe((res:any)=>{        
        this.editingCommentId = null;
        this.newContent = '';  
        this.getComments();
      })
    }

    // delete comment 
    deleteComment(data:any){
      const obj = {
        commentId: data._id,
        token: this.token
      }
      this.service.deleteComment(obj).subscribe((res:any)=>{
        if(res.success = 'true'){
          this.getComments();
        }
        
      })
    
    }


    // open dialog for add to playlist

    openDialogforaddtoPlaylist(){
     this.dialog.open(AddToPlaylistComponent,{
      width: '300px',
      data: this.videoId
     })
    }











}
