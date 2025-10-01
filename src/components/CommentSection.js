import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ postId, initialComments = [], currentUserId }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // API call to add comment
      const comment = {
        _id: `temp-${Date.now()}`,
        content: newComment,
        user: {
          _id: currentUserId,
          name: 'Current User', // This would come from user context
          avatar: '/default-avatar.png'
        },
        createdAt: new Date().toISOString(),
        likes: [],
        replies: []
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      // Here you would make the actual API call
      // await api.addComment(postId, newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentCommentId) => {
    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const reply = {
        _id: `reply-temp-${Date.now()}`,
        content: replyText,
        user: {
          _id: currentUserId,
          name: 'Current User',
          avatar: '/default-avatar.png'
        },
        createdAt: new Date().toISOString(),
        likes: []
      };

      setComments(prev => prev.map(comment => 
        comment._id === parentCommentId 
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      ));

      setReplyText('');
      setReplyingTo(null);
      
      // API call for reply
      // await api.addReply(postId, parentCommentId, replyText);
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId, isReply = false, parentCommentId = null) => {
    try {
      if (isReply && parentCommentId) {
        // Handle reply like
        setComments(prev => prev.map(comment => 
          comment._id === parentCommentId 
            ? {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply._id === commentId
                    ? {
                        ...reply,
                        likes: reply.likes.includes(currentUserId)
                          ? reply.likes.filter(id => id !== currentUserId)
                          : [...reply.likes, currentUserId]
                      }
                    : reply
                )
              }
            : comment
        ));
      } else {
        // Handle comment like
        setComments(prev => prev.map(comment =>
          comment._id === commentId
            ? {
                ...comment,
                likes: comment.likes.includes(currentUserId)
                  ? comment.likes.filter(id => id !== currentUserId)
                  : [...comment.likes, currentUserId]
              }
            : comment
        ));
      }

      // API call to like comment/reply
      // await api.likeComment(postId, commentId, isReply);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const Comment = ({ comment, isReply = false, parentCommentId = null }) => {
    const isLiked = comment.likes.includes(currentUserId);
    const [showReplies, setShowReplies] = useState(false);

    return (
      <div className={`comment ${isReply ? 'reply' : ''}`}>
        <div className="comment-header">
          <img 
            src={comment.user.avatar || '/default-avatar.png'} 
            alt={comment.user.name}
            className="user-avatar"
          />
          <div className="user-info">
            <h4 className="user-name">{comment.user.name}</h4>
            <span className="comment-time">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>
        
        <div className="comment-actions">
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={() => handleLikeComment(comment._id, isReply, parentCommentId)}
          >
            {comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}
          </button>
          
          {!isReply && (
            <button 
              className="reply-button"
              onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
            >
              Reply
            </button>
          )}
          
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <button 
              className="show-replies-button"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </div>

        {/* Reply input */}
        {replyingTo === comment._id && (
          <div className="reply-input">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              rows="3"
            />
            <div className="reply-actions">
              <button 
                onClick={() => handleSubmitReply(comment._id)}
                disabled={!replyText.trim() || isSubmitting}
                className="submit-reply"
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
              <button 
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText('');
                }}
                className="cancel-reply"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => (
              <Comment 
                key={reply._id} 
                comment={reply} 
                isReply={true}
                parentCommentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    isReply: PropTypes.bool,
    parentCommentId: PropTypes.string
  };

  return (
    <div className="comment-section">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="add-comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="3"
          className="comment-textarea"
        />
        <div className="comment-form-actions">
          <button 
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="submit-comment"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string),
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string
          }).isRequired,
          createdAt: PropTypes.string.isRequired,
          likes: PropTypes.arrayOf(PropTypes.string)
        })
      )
    })
  ),
  currentUserId: PropTypes.string.isRequired
};

export default CommentSection;
