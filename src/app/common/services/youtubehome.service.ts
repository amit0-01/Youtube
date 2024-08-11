import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/constant';

@Injectable({
  providedIn: 'root'
})
export class YoutubehomeService {

  constructor(private http: HttpClient) { }

  getAllVideos(userId:string, token: string){
  const url = `${apiUrl}/api/v1/videos/videoActions`
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`

  })
  const params = new HttpParams()
    .set("userId",userId)

    return this.http.get(url, {headers})
  
  }

  uploadVideo(obj: any, token: string): Observable<any> {
    console.log(obj);
    
    const url = `${apiUrl}/api/v1/videos/videoActions`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, obj, { headers });
  }
  // check if video is like or not
  getLikedVideos(videoId:any, token: any){
  const url = `${apiUrl}/api/v1/likes/videos/${videoId}`
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get(url, {headers})
  }


  // get individual video comments

  getIndividualVideoComments(videoId:any, token: any){
    const url = `${apiUrl}/api/v1/comments/${videoId}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }
    )

    return this.http.get(url, {headers})

  }

  // add comment
  addComment(videoId:any, token: any, content :any){
    const url = `${apiUrl}/api/v1/comments/${videoId}`
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
        })
       const obj = {
          content: content
        }
        return this.http.post(url, obj, {headers})
  }

    // liket the comment 
    liketheComment(commentId: any, token: any) {
      console.log('token', token);
  
      const url = `${apiUrl}/api/v1/likes/toggle/c/${commentId}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log(headers);
  
      return this.http.post(url, {}, { headers: headers });
    }

    // toogle the subscription
    toogleSubscription(channelId:any , token:any){
      console.log(token);
      
      const url = `${apiUrl}/api/v1/subscriptions/c/${channelId}`
      const headers = new  HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
      return this.http.post(url, {}, {headers})

    }

    // get subscribed channel
    getSubscribedChannel(channelId:any, token:any){
      const url = `${apiUrl}/api/v1/subscriptions/c/${channelId}`
      const headers = new  HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
      return this.http.get(url,{headers})
    }

    // toogle video like
    toogleLike(videoId:any, token:any){
      const url = `${apiUrl}/api/v1/likes/toggle/v/${videoId}`
      const headers = new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
      return this.http.post(url, {}, {headers})
    }

    // edit comment 
    editComment(data:any){
      const url = `${apiUrl}/api/v1/comments/c/${data.commentId}`
      const headers = new HttpHeaders({
        'Authorization' : `Bearer ${data.token}`
      })
      const obj = {
        content: data.content
      }
      return this.http.patch(url,obj, {headers})

    }

    // delete comment
    deleteComment(data:any){
      const url = `${apiUrl}/api/v1/comments/c/${data.commentId}`
      const headers = new HttpHeaders({
        'Authorization' : `Bearer ${data.token}`
      })
      return this.http.delete(url, {headers})
    }

    // create playlist
    addPlaylist(playlistName: any, playlistDescription:any, token:any){
      const url = `${apiUrl}/api/v1/playlist/create`
      const headers = new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
      const obj ={
        name: playlistName,
        description: playlistDescription
      }
      return this.http.post(url,obj ,{headers})
    }

    // get playlist
    getPlaylist(token:any, userId:any): Observable<any>{
    const url = `${apiUrl}/api/v1/playlist/user/${userId}`
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get(url,{headers})
      }

      // add video to playlist
      addVideotoPlaylist(data:any){
        console.log(data);
        
        const url = `${apiUrl}/api/v1/playlist/add/${data.videoId}/${data.playlistId}`
        const headers = new HttpHeaders({
          'Authorization' : `Bearer ${data.token}`
        })
        return this.http.patch(url,{},{headers})
      }

      // remove video from playlist
      removeVideofromPlaylist(data:any){
        const url = `${apiUrl}/api/v1/playlist/remove/${data.videoId}/${data.playlistId}`
        const headers = new HttpHeaders({
          'Authorization' : `Bearer ${data.token}`
        })
        return this.http.patch(url,{},{headers})
      }

            // get playlistbyid
            getPlayListbyId(playListId:any, token:any){
              const url = `${apiUrl}/api/v1/playlist/${playListId}`
              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
              })
            return this.http.get(url, {headers})
            }
            // logout
        
            logout(token:any){
              const url = `${apiUrl}/api/v1/users/logout`
              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
              })
              return this.http.post(url, {}, {headers})
            }

            // register
            register(formData:any){
            const url = `${apiUrl}/api/v1/users/register`
            return this.http.post(url, formData)
            
            }
      }
      


