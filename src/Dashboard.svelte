<script>
    import {db, storage} from "./firebase";
    import { collection, addDoc, query, orderBy } from "firebase/firestore";
    import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
    import {collectionData} from "rxfire/firestore"
    import {startWith} from "rxjs/operators"

    import GoPrimitiveDot from 'svelte-icons/go/GoPrimitiveDot.svelte'

	import Post from "./components/Post.svelte"


    export let user;
    export let logout;

    let post = {
        title: "",
        content: null,
        image: null
    };

    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const posts = collectionData(q, "id").pipe(startWith([]));
    
    async function sendPost(){
        await addDoc(collection(db, "posts"), {
            uid: user.uid,
            user: user.displayName,
            title: post.title,
            content: post.content,
            image: post.image,
            avatar: user.photoURL,
            upvotes: 0,
            comments: 0,
            timestamp: +new Date()
        });

        post = {
            title: "",
            content: null,
            image: null
        }
    }

    const uploadImage = (e) =>{
        const selectedFile = e.target.files[0];
        const storageRef = ref(storage, user.uid + selectedFile.lastModified);

        uploadBytes(storageRef, selectedFile).then((snapshot) => {
            console.log(snapshot)
            post.image = user.uid + selectedFile.lastModified
        });
    }

    const loadImage = (id) =>{
        let imgUrl;
        let imgRef = ref(storage, id);
        console.log(imgRef)
        getDownloadURL(imgRef)
        .then((url) => {
            document.getElementById(id).src = url
            imgUrl = url
        })

        return imgUrl
    }
</script>

<main>
    <header class="row align_center space_between">
        <h2>2Cents</h2>
        <div class="row" style="width: 50vw">
            <input type="text" placeholder="Seach 2Cents">
        </div>
        <button class="primary" on:click={logout}>logout</button>
    </header>
    <div class="container column gap_20">
        <div class="subDao_info">
            <div class="row space_between align_center">
                <div class="column">
                    <div class="row align_center gap_20">
                        <div class="column">
                            <img class="avatar" src={user.photoURL} alt="">
                        </div>
                        <div class="column gap_10">
                            <div class="row align_center gap_40">
                                <h1>{user.displayName}</h1>
                                <p>{user.uid.substr(0,4) + "...." + user.uid.substr(-4)}</p>
                            </div>
                            <div class="row gap_60 align_center info">
                                <p>4.4k members</p>
                                <div class="row align_center">
                                    <div class="icon row">
                                        <GoPrimitiveDot />
                                    </div>
                                    <p> 103 online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column flex_end gap_10">
                    <p>Your Piety</p>
                    <h6>450</h6>
                </div>
            </div>
        </div>

        <div class="main_content row gap_20" style="padding-bottom: 20px;">
            <div class="column gap_20 flex">
                <div class="card column gap_10 post_container">
                    <div class="row align_center gap_10">
                        <img class="avatar_sm" src={user.photoURL} alt="">
                        <input type="text" placeholder="Post title" bind:value={post.title}>
                        <button on:click={sendPost}>Post</button>
                    </div>
                    <div class="content column gap_10">
                        <div class="row">
                            <!-- <textarea rows="5" placeholder="Post Content" bind:value={post.content}></textarea> -->
                            <input type="text" placeholder="Post content" bind:value={post.content}>
                        </div>
                        <input type="file" name="" id="" on:change={uploadImage}>
                    </div>
                </div>

                {#each $posts as post}
                    <Post post={post} loadImage={loadImage} />
                {/each}
            </div>

            <div class="column sidebar">
                <div class="card column gap_20">
                    <div class="column gap_10">
                        <h3>Overview</h3>
                        <div class="row">
                            <a href="/#">Staking</a><a href="/#">Awards</a><a href="/#">About</a>
                        </div>
                    </div>
                    <div class="column gap_40">
                        <div class="row space_between">
                            <p>$CEN Staked</p>
                            <p>1mm</p>
                        </div>
                        <div class="row space_between">
                            <p>Your Stake</p>
                            <p>13,908</p>
                        </div>
                    </div>
                    <div class="row">
                        <button class="secondary flex">Unstake</button>
                        <button class="primary flex">Stake</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    header{
        padding: 20px;
    }
    .container{
        width: 65vw;
        margin: auto;
    }

    .avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .avatar_sm{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .info p{
        font-weight: 300;
        font-size: smaller;
    }

    .sidebar{
        width: 35%;
    }

    .card{
        background-color: #1A1C24;
        padding: 10px;
        border: 1px solid #2b2e3a;
        border-radius: 8px;
    }

    .card p{
        font-weight: 300;
        font-size: 13px;
    }

    input, textarea{
        border: none;
        outline: none;
        background-color: #0E1116;
        color: #acb9cf;
        font-size: 14px;
        padding: 10px;
        flex: 1;
        border-radius: 5px;
    }
    input::placeholder, textarea::placeholder{
        color: #647085;
    }

    .card button{
        background-color: #6376F7;
        color: #12151A;
        border: none;
        outline: none;
        padding: 10px 15px;
        border-radius: 5px;
    }

    a{
        text-decoration: inherit;
        color: #6376F7;
        font-size: smaller;
        margin: 0 10px;
    }

    ::file-selector-button{
        border: none;
        outline: none;
        padding: 10px 15px;
        border-radius: 5px;
        background-color: #6376F7;
        color: #12151A;
    }

    button.primary{
        background-color: #6376F7;
        color: #12151A;
    }
    button.secondary{
        background-color: transparent;
        color: #6376F7;
    }

    .content{
        display: none;
    }

    .post_container:focus-within .content{
        display: flex;
    }

    .icon {
        color: #6AD28A;
        width: 12px;
        height: 12px;
        padding-right: 5px;
    }

    @media only screen and (max-width: 850px) {
        .container{
            width: 85vw;
        }
        h1{
            font-size: 15px;
        }
        .main_content{
            flex-direction: column-reverse;
        }
        .sidebar{
            width: 100%;
        }
    }
</style>