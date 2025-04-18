import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast  from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState, useResetRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
const HomePage=()=>{

    const [posts,setPosts] = useRecoilState(postsAtom);
    const [loading,setLoading] = useState(true);
    const showToast = useShowToast();
    useEffect(()=>{
        const getFeedPosts = async()=>{
            setLoading(true);
            setPosts([]);
            try{

                const res = await fetch("https://threads-backend-8pii.onrender.com/api/posts/feed",{
                    method:'GET',
                    credentials:"include",
                });
                const data = await res.json();
                if(data.error){
                    showToast("Error",data.error,"error");
                    return;
                }
                console.log(data);

                setPosts(data);

            }catch(error){
                showToast("Error",error.message,"error");
            }finally{
                setLoading(false);
            }
        }
        getFeedPosts();
    },[showToast,setPosts]);

    return(
        <>
            {loading &&(
                <Flex justify={"center"}>
                    <Spinner size={"xl"}/>
                </Flex>
            )}

            {!loading && posts.length === 0 && (
                <h1>  Follow some users to see your feed </h1>
                
            )}

            {posts.map((post)=>(
                <Post key={post._id} post={post} postedBy={post.postedBy}/>
            ))}
        </>
    );
}

export default HomePage;