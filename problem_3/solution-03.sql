SELECT r.id AS request_id,
    r.title,
    r.description,
    s.type,
    r.requested_at,
    r.updated_at
FROM (
    SELECT approval_request_id, type
    FROM approval_step
    WHERE approver_id = :userId AND status = 'proceeding'
) s
JOIN approval_request r
ON r.id = s.approval_request_id
WHERE r.deleted_at IS NULL
ORDER BY r.updated_at ASC, r.requested_at ASC;