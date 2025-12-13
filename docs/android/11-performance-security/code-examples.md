---
layout: default
title: "Code Examples"
parent: "Performance Security"
nav_order: 999
---

## 1. Network Security Config (SSL Pinning)
`res/xml/network_security_config.xml`:
```xml
<network-security-config>
    <domain-config>
        <domain includeSubdomains="true">api.example.com</domain>
        <pin-set>
            <!-- Hash of the public key -->
            <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
            <!-- Backup pin -->
            <pin digest="SHA-256">fwza0LRMXouZHRC8Ei+4PyuldWDcf3Bu0E6Pi6BBAiQ=</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```

## 2. Encrypted File Storage
**Goal**: Store generic heavy files safely.

```kotlin
val mainKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val encryptedFile = EncryptedFile.Builder(
    context,
    File(context.filesDir, "secret_data.txt"),
    mainKey,
    EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
).build()

// Write
encryptedFile.openFileOutput().use { 
    it.write("Super Secret".toByteArray()) 
}
```

## 3. Prevent Screenshots (Privacy)
**Goal**: Stop "Recent Apps" screenshot or user capture for banking apps.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    window.setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE
    )
    // ...
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)