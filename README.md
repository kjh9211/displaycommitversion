# displaycommitversion

Discord 봇의 바이오(소개)에 현재 git 커밋 버전을 자동으로 표시해주는 유틸리티 패키지입니다.

## 설치

```bash
npm install displaycommitversion
```

## 함수

### `getCommitVersion(options?)`

최신 git 커밋 정보를 가져옵니다.

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `options.dateFormat` | `string` | `"%cd"` | git log 날짜 포맷 |

**반환값:** 커밋 버전 문자열. git 실행 실패 시 `"unknown"` 반환.

```ts
import { getCommitVersion } from "displaycommitversion";

const version = getCommitVersion();
// 예: "2025-05-17 12:34:56 +0900"

const customVersion = getCommitVersion({ dateFormat: "%h" });
// 예: "a1b2c3d" (짧은 커밋 해시)
```

### `changeBotBio(client, bio, options?)`

Discord 봇의 바이오를 커밋 버전 정보와 함께 업데이트합니다.

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `client` | `Client` | discord.js Client 인스턴스 |
| `bio` | `string` | 설정할 바이오 텍스트. `{commitVersion}` 플레이스홀더 사용 가능 |
| `options.commitDateOption` | `string` | 커밋 버전의 날짜 포맷 (선택) |

**반환값:** `Promise<boolean>` — 성공 시 `true`, 실패 시 `false`.

```ts
import { Client, GatewayIntentBits } from "discord.js";
import { changeBotBio } from "displaycommitversion";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  await changeBotBio(client, "My Bot | 배포: {commitVersion}");
  // 바이오가 "My Bot | 배포: 2025-05-17 12:34:56 +0900" 으로 업데이트됨
});

client.login("YOUR_BOT_TOKEN");
```

커밋 해시를 표시하고 싶다면:

```ts
await changeBotBio(client, "v1.0 | commit: {commitVersion}", {
  commitDateOption: "%h",
});
// 바이오가 "v1.0 | commit: a1b2c3d" 으로 업데이트됨
```

## 라이선스

ISC
