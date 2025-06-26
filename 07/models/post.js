module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachments: {
        type: DataTypes.JSON, //여러 파일 정보를 JSON으로 저장
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "posts",
    }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };
  return Post;
};
