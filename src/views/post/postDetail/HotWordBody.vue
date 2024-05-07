<template>
	<div>
		<div class="warpper">
			<div class="user-info">
				<img src="https://hot-world01.oss-cn-shenzhen.aliyuncs.com/08dc6abdbeb8236a1a44511d96728cba.jpeg" class="user-info-avatar" />
				<div class="user-connent">
					<p class="user-info-name">人机</p>
					<div class="user-send-info">
						<p class="user-send-time">24-3-3 20:30</p>
						<p class="user-info-concern">拍摄拍照领域博主</p>
					</div>
				</div>

				<div class="add-concern">+ 关注</div>
			</div>

			<div class="user-send-connent-warpper">
				<p>晚霞是世界上最美的情话。</p>

				<div class="user-send-connent-warpper-picture">
					<ul class="user-send-connent-warpper-picture-list">
						<li class="user-send-connent-warpper-picture-list-item"
							v-for="item, index in userSendConnentPictureList" :key="index"><img :src="item.imgUrl"
								:style="{ 'width': userSendConnentPictureList.length >= 6 ? '110px' : '170px', 'height': userSendConnentPictureList.length >= 6 ? '110px' : '170px' }"
								class="user-send-connent-warpper-picture-list-item-picture" /></li>
					</ul>
				</div>

				<div class="user-operate">
					<ul class="user-operate-list">
						<li class="user-operate-item"><img src="https://img2.imgtp.com/2024/03/17/9n8F47dK.png" /></li>
						<li class="user-operate-item"><img src="https://img2.imgtp.com/2024/03/17/Yp2zsKEE.png" /></li>
						<li class="user-operate-item"><img src="https://img2.imgtp.com/2024/03/17/atH20L7c.png" /></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'postView2',
  data () {
    return {
      isShowPreview: false,
      selectImgUrl: '',
      userSendConnentPictureList: [{
        imgUrl: 'https://img.zcool.cn/community/01a0c75d6c7d84a801211f9e461bb6.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/011b665be7e875a80121ab5da558a7.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/011697595a518da8012193a344b909.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      },
      {
        imgUrl: 'https://img.zcool.cn/community/01f3855d6c7d7da801211f9ebfce8f.jpg'
      }

      ]
    }
  },
  created () {

  },
  methods: {
    openAvatarPreview (img) {
      this.selectImgUrl = img
      this.isShowPreview = true
    },
    closeAvatarPreview () {
      this.$refs.Preview.style.opacity = 0
      this.$refs.PreviewOperate.style.opacity = 0
      setTimeout(() => {
        this.isShowPreview = false
      }, 100)
    }
  },
  watch: {

  }

}
</script>

<style lang="less" scoped>
body {

	background-color: #ececec;
}

.warpper {
	width: 100%;
	height: 100%;
	background-color: #ffffff;

	.user-info {
		display: flex;
		align-items: center;
		width: 90%;
		height: 120px;
		margin: 20px auto;

		.user-connent {
			width: auto;
			height: 100%;
			align-items: flex-start;

			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: center;

			.user-info-name {
				display: inline-block;
				width: 180px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 5px;
				font-size: 16px;
				color: #ff5c00;
			}

			.user-send-address {
				font-size: 14px;
				color: #b9baba;
			}

			.user-send-info {
				font-size: 14px;
				color: #b9baba;
				margin-bottom: 5px;
				display: flex;

				.user-send-time {
					margin-right: 10px;
				}
			}
		}

		.user-info-avatar {
			width: 50px;
			height: 50px;
			border-radius: 100%;
			margin-right: 5%;

		}

		.add-concern {
			position: absolute;
			top: 2%;
			right: 20px;
			padding: 5px;
			border-radius: 25px;
			border: 1px solid #ff5c00;
			color: #ff5c00;
		}
	}

	.user-send-connent-warpper {
		width: 90%;
		height: auto;
		margin: -30px auto;

		.user-send-connent-warpper-picture {
			margin-left: -10px;

			.user-send-connent-warpper-picture-list {
				display: flex;
				flex-wrap: wrap;

				.user-send-connent-warpper-picture-list-item {
					margin: 10px 0 0 10px;

					.user-send-connent-warpper-picture-list-item-picture {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.user-operate {
			width: 90%;
			height: 60px;
			margin: 20px auto;

			.user-operate-list {
				display: flex;
				justify-content: space-between;

				.user-operate-item {
					width: 40px;
					height: 40px;
					border-radius: 100%;
					background-color: #ececec91;

					img {
						position: relative;
						top: 10%;
						left: 12%;
						width: 30px;
						height: 30px;
					}
				}
			}
		}
	}

}

.user-info-warrper {
	width: 100%;
	height: auto;
	background-color: #ffffff;
	border-radius: 10px;

	.info {
		width: 90%;
		margin: 80px auto;

		.user-info-avatar {
			width: 80px;
			height: 80px;
			border-radius: 100%;
			border: 3px solid #ffffff;
		}

		.user-Information {
			position: relative;
			top: -70px;
			left: 100px;

			.user-name {
				margin-bottom: 5px;
			}
		}

		.Information {
			width: 220px;
			display: flex;
			justify-content: space-between;

			p span {
				margin-left: 5px;
				color: #b9baba;
			}
		}

		.BriefIntroduction {
			position: relative;
			top: -40px;
			color: #b9baba;
		}

	}
}

@keyframes openAvatarPreviewMove {
	from {
		transform: translateY(50px);
		opacity: 0;
	}

	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.Pop-ups {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #f1f1f1;
	animation: openAvatarPreviewMove .3s;
	transition: .3s;
	top: 0;

	.avatar {
		width: 100%;
		height: 500px;
	}

}

.Pop-operate {
	width: 100%;
	position: absolute;
	bottom: 20%;
	z-index: 99;
	transition: .3s;
	animation: openAvatarPreviewMove .3s;

	.operate {
		margin: 0 auto;
		margin-top: 20px;
		width: 80%;
		text-align: center;
		line-height: 50px;
		height: 50px;
		border-radius: 25px;
		background-color: #ffffff8a;
		border: 1px solid #b9baba;
	}
}

// .user-comments-warrper {
// 	display: flex;
// 	align-items: center;
// 	width: 80%;
// 	height:auto;
// 	margin: 50px auto;

// 	.user-connent {
// 		width: auto;
// 		height: 100%;
// 		align-items: flex-start;

// 		display: flex;
// 		flex-direction: column;
// 		flex-wrap: wrap;
// 		justify-content: center;

// 		.user-info-name {
// 			display: inline-block;
// 			width: 180px;
// 			overflow: hidden;
// 			text-overflow: ellipsis;
// 			white-space: nowrap;
// 			margin-bottom: 5px;
// 			font-size: 16px;
// 			color: #ff5c00;
// 		}

// 		.user-send-address {
// 			font-size: 14px;
// 			color: #b9baba;
// 		}

// 		.user-send-info {
// 			font-size: 14px;
// 			color: #b9baba;
// 			margin-bottom: 5px;
// 			display: flex;

// 			.user-send-time {
// 				margin-right: 10px;
// 			}
// 		}
// 	}

// 	.user-info-avatar {
// 		width: 50px;
// 		height: 50px;
// 		border-radius: 100%;
// 		margin-right: 5%;

// 	}

// 	.add-concern {
// 		position: absolute;
// 		top: 2%;
// 		right: 20px;
// 		padding: 5px;
// 		border-radius: 25px;
// 		border: 1px solid #ff5c00;
// 		color: #ff5c00;
// 	}
// }</style>
