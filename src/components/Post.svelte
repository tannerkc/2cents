<script>
    import MdChat from 'svelte-icons/md/MdChat.svelte';
    import MdArrowUpward from 'svelte-icons/md/MdArrowUpward.svelte';
    import MdArrowDownward from 'svelte-icons/md/MdArrowDownward.svelte';

    export let post;
    export let loadImage;
</script>

<div class="post card column gap_10">
    <div class="row gap_10 align_center small_font">
        <img src={post.avatar} alt="" class="avatar_sm">
        <p>Posted by: {post.user}</p>
        <p>&#183;</p>
        <p>500 PY</p>
        <p>&#183;</p>
        <p>{Math.round((new Date().getTime() - new Date(post.timestamp).getTime())/1000)} seconds ago</p>
    </div>
    <div class="row">{post.title}</div>
    {#if post.image}
        <img class="post_image" src={loadImage(post.image)} id={post.image} alt="">
    {/if}
    {#if post.content}
        <p>
            {post.content}
        </p>
    {/if}
    <div class="row gap_40 align_center">
        <div class="row gap_10 align_center">
            <button class="secondary no_padding">
                <div class="icon">
                    <MdArrowUpward />
                </div>
            </button>
            <p>{post.upvotes} PY</p>
            <button class="secondary no_padding">
                <div class="icon">
                    <MdArrowDownward />
                </div>
            </button>
        </div>
        <div class="row gap_10 align_center">
            <button class="secondary row align_center gap_10">
                <div class="icon">
                    <MdChat />
                </div>
                {post.comments} Comments
            </button>
        </div>
    </div>
</div>

<style>
    .avatar_sm{
        width: 40px;
        height: 40px;
        border-radius: 50%;
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

    button{
        border: none;
        outline: none;
        padding: 10px 15px;
        border-radius: 5px;
    }
    
    button.secondary{
        background-color: transparent;
        color: #6376F7;
    }

    .no_padding{
        padding: 0 !important;
    }
    .icon {
        width: 18px;
        height: 18px;
    }

    .post p{
        font-weight: 100;
        font-size: 14px;
    }

    .small_font p{
        font-size: 10px;
    }

    .post_image{
        width: 100%;
        border-radius: 8px;
    }
</style>