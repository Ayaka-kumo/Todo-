<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f8a9b8">
    <title>My Little Todo</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="page-shell">
        <aside class="sidebar">
            <a class="brand" href="#" aria-label="My Little Todo">
                <span class="brand-mark">♡</span>
                <span>My Little Todo</span>
            </a>

            <nav class="nav-list" aria-label="メインメニュー">
                <button class="nav-item active" data-filter="all">
                    <span class="nav-icon">⌂</span><span>今日のタスク</span>
                    <span class="nav-count" id="allCount">0</span>
                </button>
                <button class="nav-item" data-filter="important">
                    <span class="nav-icon">☆</span><span>大切なこと</span>
                </button>
                <button class="nav-item" data-filter="completed">
                    <span class="nav-icon">✓</span><span>できたこと</span>
                </button>
            </nav>

            <div class="sidebar-note">
                <span class="note-sparkle">✦</span>
                <strong>今日もすてきな一日に</strong>
                <p>小さな一歩も、ちゃんと前進。</p>
            </div>
        </aside>

        <main class="main-content">
            <header class="topbar">
                <button class="mobile-menu" id="mobileMenu" aria-label="メニューを開く">☰</button>
                <div>
                    <p class="eyebrow" id="todayLabel">TODAY</p>
                    <h1>おはよう、<span>あやかさん</span></h1>
                    <p class="greeting">今日はどんな一日にする？</p>
                </div>
                <button class="profile-button" aria-label="プロフィール">
                    <span class="profile-face">˶ᵔ ᵕ ᵔ˶</span>
                </button>
            </header>

            <section class="progress-card" aria-label="今日の進捗">
                <div class="progress-copy">
                    <div class="progress-title">
                        <span class="sun-icon">☀</span>
                        <div>
                            <span>今日のすすみ具合</span>
                            <strong id="progressMessage">ゆっくり始めよう</strong>
                        </div>
                    </div>
                    <div class="progress-track"><span id="progressBar"></span></div>
                    <p><strong id="completedCount">0</strong> / <span id="totalCount">0</span> できたよ</p>
                </div>
                <div class="progress-bubble">
                    <span id="progressPercent">0%</span>
                    <small>completed</small>
                </div>
                <span class="deco deco-one">✦</span>
                <span class="deco deco-two">♡</span>
            </section>

            <section class="task-section">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">MY TASKS</p>
                        <h2 id="sectionTitle">今日やること</h2>
                    </div>
                    <button class="add-button" id="openTaskModal"><span>＋</span> タスクを追加</button>
                </div>

                <div class="category-tabs" role="tablist">
                    <button class="category-tab active" data-category="all">すべて</button>
                    <button class="category-tab" data-category="work"><i class="dot work"></i>おしごと</button>
                    <button class="category-tab" data-category="personal"><i class="dot personal"></i>じぶん</button>
                    <button class="category-tab" data-category="home"><i class="dot home"></i>おうち</button>
                </div>

                <div class="task-list" id="taskList"></div>

                <div class="empty-state" id="emptyState" hidden>
                    <div class="empty-face">ᵕ̈</div>
                    <h3>タスクはありません</h3>
                    <p>のんびり過ごすのも大切だね。</p>
                </div>
            </section>
        </main>
    </div>

    <dialog class="task-modal" id="taskModal">
        <form method="dialog" id="taskForm">
            <button class="modal-close" value="cancel" aria-label="閉じる">×</button>
            <div class="modal-icon">♡</div>
            <p class="eyebrow">NEW TASK</p>
            <h2>あたらしいタスク</h2>
            <label>
                やること
                <input id="taskInput" name="title" placeholder="例：お気に入りの本を読む" required maxlength="80">
            </label>
            <label>
                カテゴリ
                <select id="categoryInput" name="category">
                    <option value="personal">じぶん</option>
                    <option value="work">おしごと</option>
                    <option value="home">おうち</option>
                </select>
            </label>
            <label class="important-check">
                <input id="importantInput" type="checkbox" name="important">
                <span>大切なタスクにする ☆</span>
            </label>
            <button class="submit-task" type="submit">タスクを追加する</button>
        </form>
    </dialog>
</body>
</html>
