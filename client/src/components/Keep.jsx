    // useEffect(() => {
    //     if (commentOpen) {
    //         axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
    //             .then(res => setComments(res?.data?.tweet?.comments))
    //             .catch(err => console.log(err));
    //     }
    // }, [commentOpen, tweet._id])









      // useEffect(() => {
    //     const fetchComments = async () => {
    //         try {
    //             if (commentOpen) {
    //                 const res = await axios.get(`http://localhost:8080/api/tweet/tweets/${tweet?._id}/comments`)
    //                 console.log("Allcommet", res.data.tweet.comments)
    //                 setComments(res?.data?.tweet?.comments)
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     // fetchComments();
    // }, [commentOpen, tweet._id]);